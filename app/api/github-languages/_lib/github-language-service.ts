import type {
  CodingActivitySummary,
  ContributionSummary,
  LanguageStat,
} from '@/lib/github-language'

type GitHubRepo = {
  name: string
  private: boolean
  owner: {
    login: string
  }
}

type GitHubUser = {
  login: string
}

type GitHubLanguagesResponse = Record<string, number>

type GitHubContributorWeek = {
  a: number
  d: number
  c: number
}

type GitHubContributorStat = {
  author?: {
    login?: string
  }
  weeks?: GitHubContributorWeek[]
}

type GitHubApiError = {
  message?: string
}

type GraphQLContributionCollection = {
  totalCommitContributions: number
  totalPullRequestContributions: number
  totalPullRequestReviewContributions: number
  totalIssueContributions: number
  hasAnyRestrictedContributions: boolean
  restrictedContributionsCount: number
}

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: GraphQLContributionCollection
    }
  }
  errors?: Array<{ message?: string }>
}

type FetchGitHubOptions = {
  token: string
}

export type GitHubFetchResult<T> = {
  ok: boolean
  status: number
  data: T | null
  errorMessage: string | null
  isRateLimited: boolean
}

const GITHUB_API_BASE = 'https://api.github.com'
const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql'

function buildGitHubHeaders(token: string): HeadersInit {
  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: `Bearer ${token}`,
  }
}

async function fetchGitHubJson<T>(
  url: string,
  options: FetchGitHubOptions,
): Promise<GitHubFetchResult<T>> {
  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    headers: buildGitHubHeaders(options.token),
  })

  const isRateLimited =
    response.status === 429
    || (response.status === 403
      && response.headers.get('x-ratelimit-remaining') === '0')

  if (!response.ok) {
    let errorMessage = `GitHub API request failed: ${response.status}`

    try {
      const errorJson = (await response.json()) as GitHubApiError
      if (errorJson.message) {
        errorMessage = errorJson.message
      }
    } catch {
      // エラーレスポンスがJSONでない場合は既定メッセージを利用する
    }

    return {
      ok: false,
      status: response.status,
      data: null,
      errorMessage,
      isRateLimited,
    }
  }

  const data = (await response.json()) as T

  return {
    ok: true,
    status: response.status,
    data,
    errorMessage: null,
    isRateLimited,
  }
}

export async function fetchGitHubUser(
  username: string,
  token: string,
): Promise<GitHubFetchResult<GitHubUser>> {
  return fetchGitHubJson<GitHubUser>(
    `${GITHUB_API_BASE}/users/${username}`,
    { token },
  )
}

export async function fetchGitHubRepos(
  username: string,
  token: string,
): Promise<GitHubFetchResult<GitHubRepo[]>> {
  // 認証済みユーザーの所有リポジトリを対象にし、private も含めて集計可能にする
  const response = await fetchGitHubJson<GitHubRepo[]>(
    `${GITHUB_API_BASE}/user/repos?visibility=all&affiliation=owner&sort=updated&per_page=100&page=1`,
    { token },
  )

  if (!response.ok || !response.data) {
    return response
  }

  const ownedByTarget = response.data.filter((repo) => repo.owner.login === username)

  return {
    ...response,
    data: ownedByTarget,
  }
}

export async function fetchRepoLanguages(
  owner: string,
  repo: string,
  token: string,
): Promise<GitHubFetchResult<GitHubLanguagesResponse>> {
  return fetchGitHubJson<GitHubLanguagesResponse>(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`,
    { token },
  )
}

export async function fetchRepoContributorStats(
  owner: string,
  repo: string,
  token: string,
): Promise<GitHubFetchResult<GitHubContributorStat[] | null>> {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/stats/contributors`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: buildGitHubHeaders(token),
    },
  )

  const isRateLimited =
    response.status === 429
    || (response.status === 403
      && response.headers.get('x-ratelimit-remaining') === '0')

  // GitHub 側で統計を準備中の場合は 202 が返るため、失敗扱いにせずスキップ可能にする
  if (response.status === 202) {
    return {
      ok: true,
      status: 202,
      data: null,
      errorMessage: null,
      isRateLimited,
    }
  }

  if (!response.ok) {
    let errorMessage = `GitHub API request failed: ${response.status}`

    try {
      const errorJson = (await response.json()) as GitHubApiError
      if (errorJson.message) {
        errorMessage = errorJson.message
      }
    } catch {
      // エラーレスポンスがJSONでない場合は既定メッセージを利用する
    }

    return {
      ok: false,
      status: response.status,
      data: null,
      errorMessage,
      isRateLimited,
    }
  }

  const data = (await response.json()) as GitHubContributorStat[]

  return {
    ok: true,
    status: response.status,
    data,
    errorMessage: null,
    isRateLimited,
  }
}

export async function fetchContributionSummary(
  username: string,
  token: string,
): Promise<GitHubFetchResult<ContributionSummary>> {
  const to = new Date()
  const from = new Date(to)
  from.setFullYear(to.getFullYear() - 1)

  const query = `
    query ContributionSummary($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          totalIssueContributions
          hasAnyRestrictedContributions
          restrictedContributionsCount
        }
      }
    }
  `

  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      ...buildGitHubHeaders(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        username,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
  })

  const isRateLimited =
    response.status === 429
    || (response.status === 403
      && response.headers.get('x-ratelimit-remaining') === '0')

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      data: null,
      errorMessage: `GitHub GraphQL request failed: ${response.status}`,
      isRateLimited,
    }
  }

  const data = (await response.json()) as GraphQLResponse

  if (data.errors && data.errors.length > 0) {
    const message = data.errors[0]?.message ?? 'GitHub GraphQL returned an unknown error.'
    return {
      ok: false,
      status: 502,
      data: null,
      errorMessage: message,
      isRateLimited,
    }
  }

  const collection = data.data?.user?.contributionsCollection

  if (!collection) {
    return {
      ok: false,
      status: 404,
      data: null,
      errorMessage: 'Contribution data was not found.',
      isRateLimited,
    }
  }

  const commits = collection.totalCommitContributions
  const pullRequests = collection.totalPullRequestContributions
  const reviews = collection.totalPullRequestReviewContributions
  const issues = collection.totalIssueContributions
  const total = commits + pullRequests + reviews + issues
  const hasAnyRestrictedContributions = collection.hasAnyRestrictedContributions
  const restrictedContributionsCount = collection.restrictedContributionsCount

  const toPercent = (value: number) => (total > 0 ? (value / total) * 100 : 0)

  return {
    ok: true,
    status: 200,
    data: {
      commits,
      pullRequests,
      reviews,
      issues,
      total,
      hasAnyRestrictedContributions,
      restrictedContributionsCount,
      metrics: [
        { key: 'commits', label: 'Commits', count: commits, percent: toPercent(commits) },
        { key: 'issues', label: 'Issues', count: issues, percent: toPercent(issues) },
        { key: 'pull_requests', label: 'Pull Requests', count: pullRequests, percent: toPercent(pullRequests) },
        { key: 'reviews', label: 'Code Reviews', count: reviews, percent: toPercent(reviews) },
      ],
    },
    errorMessage: null,
    isRateLimited,
  }
}

export function aggregateLanguageStats(
  languageMaps: GitHubLanguagesResponse[],
): LanguageStat[] {
  const totals = new Map<string, number>()

  // 各リポジトリの言語バイト数を言語ごとに合算する
  for (const languageMap of languageMaps) {
    for (const [name, bytes] of Object.entries(languageMap)) {
      const current = totals.get(name) ?? 0
      totals.set(name, current + bytes)
    }
  }

  const totalBytes = Array.from(totals.values()).reduce(
    (sum, bytes) => sum + bytes,
    0,
  )

  if (totalBytes === 0) {
    return []
  }

  return Array.from(totals.entries())
    .map(([name, bytes]) => ({
      name,
      bytes,
      percent: Number(((bytes / totalBytes) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.bytes - a.bytes)
}

export function aggregateCodingActivity(
  contributorStatsList: Array<GitHubContributorStat[] | null>,
  username: string,
): CodingActivitySummary {
  let commits = 0
  let additions = 0
  let deletions = 0
  let touchedRepos = 0

  for (const contributorStats of contributorStatsList) {
    if (!contributorStats || contributorStats.length === 0) {
      continue
    }

    const myStat = contributorStats.find(
      (contributor) => contributor.author?.login === username,
    )

    if (!myStat?.weeks || myStat.weeks.length === 0) {
      continue
    }

    touchedRepos += 1

    for (const week of myStat.weeks) {
      commits += week.c
      additions += week.a
      deletions += week.d
    }
  }

  return {
    commits,
    additions,
    deletions,
    touchedRepos,
  }
}
