export type LanguageStat = {
  name: string
  bytes: number
  percent: number
}

type GitHubRepo = {
  name: string
  owner: {
    login: string
  }
}

type GitHubUser = {
  login: string
}

type GitHubLanguagesResponse = Record<string, number>

type GitHubApiError = {
  message?: string
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
  // まずはシンプルに 1ページ目（最大100件）を取得
  return fetchGitHubJson<GitHubRepo[]>(
    `${GITHUB_API_BASE}/users/${username}/repos?type=public&sort=updated&per_page=100&page=1`,
    { token },
  )
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
