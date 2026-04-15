import { NextResponse } from 'next/server'
import {
  aggregateLanguageStats,
  fetchGitHubRepos,
  fetchGitHubUser,
  fetchRepoLanguages,
  type LanguageStat,
} from '@/lib/github-language'

function jsonError(message: string, status: number) {
  return NextResponse.json(
    {
      error: message,
    },
    { status },
  )
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN
  const username = process.env.GITHUB_USERNAME?.trim()

  if (!token) {
    return jsonError('サーバー環境変数 GITHUB_TOKEN が設定されていません。', 500)
  }

  if (!username) {
    return jsonError('サーバー環境変数 GITHUB_USERNAME が設定されていません。', 500)
  }

  const userResult = await fetchGitHubUser(username, token)

  if (!userResult.ok) {
    if (userResult.status === 404) {
      return jsonError(`GitHub ユーザー "${username}" は見つかりません。`, 404)
    }

    if (userResult.isRateLimited) {
      return jsonError('GitHub API のレート制限に達しました。時間を置いて再試行してください。', 429)
    }

    return jsonError(
      `GitHub ユーザー確認に失敗しました: ${userResult.errorMessage ?? 'unknown error'}`,
      502,
    )
  }

  const reposResult = await fetchGitHubRepos(username, token)

  if (!reposResult.ok) {
    if (reposResult.isRateLimited) {
      return jsonError('GitHub API のレート制限に達しました。時間を置いて再試行してください。', 429)
    }

    return jsonError(
      `リポジトリ取得に失敗しました: ${reposResult.errorMessage ?? 'unknown error'}`,
      502,
    )
  }

  const repos = reposResult.data ?? []

  if (repos.length === 0) {
    return NextResponse.json([] satisfies LanguageStat[])
  }

  const languageResponses = await Promise.all(
    repos.map((repo) => fetchRepoLanguages(repo.owner.login, repo.name, token)),
  )

  const rateLimited = languageResponses.find((response) => response.isRateLimited)
  if (rateLimited) {
    return jsonError('GitHub API のレート制限に達しました。時間を置いて再試行してください。', 429)
  }

  const failedLanguageResponse = languageResponses.find((response) => !response.ok)

  if (failedLanguageResponse) {
    return jsonError(
      `言語情報の取得に失敗しました: ${failedLanguageResponse.errorMessage ?? 'unknown error'}`,
      502,
    )
  }

  const languageMaps = languageResponses
    .map((response) => response.data)
    .filter((data): data is Record<string, number> => data !== null)

  const stats = aggregateLanguageStats(languageMaps)

  // クライアントには必要最小限の整形データのみ返す
  return NextResponse.json(stats satisfies LanguageStat[])
}
