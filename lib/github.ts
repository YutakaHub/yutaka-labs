export type GitHubUser = {
  login: string
  avatar_url: string
  name: string | null
  html_url: string
  bio: string | null
}

type GitHubRepo = {
  languages_url: string
  fork: boolean
  archived: boolean
  disabled: boolean
}

type GitHubLanguagesResponse = Record<string, number>

export type GitHubLanguageStat = {
  name: string
  bytes: number
  percentage: number
}

export type GitHubLanguageSummary = {
  languages: GitHubLanguageStat[]
  analyzedRepos: number
  totalBytes: number
}

export const DEFAULT_GITHUB_USERNAME = 'YutakaHub'

export function normalizeGitHubUsername(
  username: string = DEFAULT_GITHUB_USERNAME,
) {
  return username.replace(/^@/, '')
}

export function getGitHubProfileUrl(
  username: string = DEFAULT_GITHUB_USERNAME,
) {
  return `https://github.com/${normalizeGitHubUsername(username)}`
}

async function fetchGitHubUserRepos(
  username: string,
): Promise<GitHubRepo[] | null> {
  const allRepos: GitHubRepo[] = []

  for (let page = 1; page <= 3; page += 1) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&page=${page}`,
      {
        // リポジトリ一覧は更新頻度がそこまで高くないため、6時間キャッシュする
        next: { revalidate: 60 * 60 * 6 },
        headers: {
          Accept: 'application/vnd.github+json',
        },
      },
    )

    if (!response.ok) {
      return null
    }

    const repos = (await response.json()) as GitHubRepo[]
    allRepos.push(...repos)

    if (repos.length < 100) {
      break
    }
  }

  return allRepos
}

export async function getGitHubUser(
  username: string = DEFAULT_GITHUB_USERNAME,
): Promise<GitHubUser | null> {
  try {
    const normalizedUsername = normalizeGitHubUsername(username)
    const response = await fetch(
      `https://api.github.com/users/${normalizedUsername}`,
      {
        // 同一ユーザー情報への過剰アクセスを防ぐため、6時間キャッシュする
        next: { revalidate: 60 * 60 * 6 },
        headers: {
          Accept: 'application/vnd.github+json',
        },
      },
    )

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as GitHubUser

    return {
      login: data.login,
      avatar_url: data.avatar_url,
      name: data.name,
      html_url: data.html_url,
      bio: data.bio,
    }
  } catch {
    // 通信エラー時は null を返し、UI側でフォールバック表示する
    return null
  }
}

export async function getGitHubLanguageSummary(
  username: string = DEFAULT_GITHUB_USERNAME,
): Promise<GitHubLanguageSummary | null> {
  try {
    const normalizedUsername = normalizeGitHubUsername(username)
    const repos = await fetchGitHubUserRepos(normalizedUsername)

    if (!repos) {
      return null
    }

    // Fork やアーカイブを除外して、実際に手を入れているコードの傾向を出す
    const targetRepos = repos.filter(
      (repo) => !repo.fork && !repo.archived && !repo.disabled,
    )

    const languageMaps = await Promise.all(
      targetRepos.map(async (repo) => {
        const response = await fetch(repo.languages_url, {
          next: { revalidate: 60 * 60 * 6 },
          headers: {
            Accept: 'application/vnd.github+json',
          },
        })

        if (!response.ok) {
          return null
        }

        return (await response.json()) as GitHubLanguagesResponse
      }),
    )

    const totals = new Map<string, number>()

    for (const languageMap of languageMaps) {
      if (!languageMap) {
        continue
      }

      for (const [language, bytes] of Object.entries(languageMap)) {
        const current = totals.get(language) ?? 0
        totals.set(language, current + bytes)
      }
    }

    const totalBytes = Array.from(totals.values()).reduce(
      (acc, bytes) => acc + bytes,
      0,
    )

    if (totalBytes <= 0) {
      return {
        languages: [],
        analyzedRepos: targetRepos.length,
        totalBytes: 0,
      }
    }

    const languages = Array.from(totals.entries())
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: Number(((bytes / totalBytes) * 100).toFixed(1)),
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 6)

    return {
      languages,
      analyzedRepos: targetRepos.length,
      totalBytes,
    }
  } catch {
    return null
  }
}
