export type GitHubUser = {
  login: string
  avatar_url: string
  name: string | null
  html_url: string
  bio: string | null
  followers: number
  following: number
  public_repos: number
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

export async function getGitHubUser(
  username: string = DEFAULT_GITHUB_USERNAME,
): Promise<GitHubUser | null> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${normalizeGitHubUsername(username)}`,
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
      followers: data.followers,
      following: data.following,
      public_repos: data.public_repos,
    }
  } catch {
    // 通信エラー時は null を返し、UI側でフォールバック表示する
    return null
  }
}
