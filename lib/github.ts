export type GitHubUser = {
  login: string
  avatar_url: string
  name: string | null
  html_url: string
  bio: string | null
}

const GITHUB_USER_ENDPOINT = 'https://api.github.com/users/YutakaHub'

export async function getGitHubUser(): Promise<GitHubUser | null> {
  try {
    const response = await fetch(GITHUB_USER_ENDPOINT, {
      // 同一ユーザー情報への過剰アクセスを防ぐため、6時間キャッシュする
      next: { revalidate: 60 * 60 * 6 },
      headers: {
        Accept: 'application/vnd.github+json',
      },
    })

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
