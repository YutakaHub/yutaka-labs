import { NextResponse } from 'next/server'
import {
  aggregateCodingActivity,
  aggregateLanguageStats,
  fetchContributionSummary,
  fetchGitHubRepos,
  fetchGitHubUser,
  fetchRepoContributorStats,
  fetchRepoLanguages,
} from '@/lib/github-language'
import { getServerEnv } from '@/lib/server-env'

function jsonError(message: string, status: number) {
  return NextResponse.json(
    {
      error: message,
    },
    { status },
  )
}

export async function GET() {
  const token = getServerEnv('GITHUB_TOKEN')
  const username = getServerEnv('GITHUB_USERNAME')?.trim()

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

  const [reposResult, contributionSummaryResult] = await Promise.all([
    fetchGitHubRepos(username, token),
    fetchContributionSummary(username, token),
  ])

  if (!reposResult.ok) {
    if (reposResult.isRateLimited) {
      return jsonError('GitHub API のレート制限に達しました。時間を置いて再試行してください。', 429)
    }

    return jsonError(
      `リポジトリ取得に失敗しました: ${reposResult.errorMessage ?? 'unknown error'}`,
      502,
    )
  }

  if (!contributionSummaryResult.ok) {
    if (contributionSummaryResult.isRateLimited) {
      return jsonError('GitHub API のレート制限に達しました。時間を置いて再試行してください。', 429)
    }

    return jsonError(
      `貢献情報の取得に失敗しました: ${contributionSummaryResult.errorMessage ?? 'unknown error'}`,
      502,
    )
  }

  const repos = reposResult.data ?? []
  const contributionSummary = contributionSummaryResult.data

  if (!contributionSummary) {
    return jsonError('貢献情報の取得結果が空でした。', 502)
  }

  if (repos.length === 0) {
    return NextResponse.json({
      languages: [],
      codingActivity: {
        commits: 0,
        additions: 0,
        deletions: 0,
        touchedRepos: 0,
      },
      contributionSummary,
      visibility: 'public_and_private_owner',
    })
  }

  const [languageResponses, contributorResponses] = await Promise.all([
    Promise.all(
      repos.map((repo) => fetchRepoLanguages(repo.owner.login, repo.name, token)),
    ),
    Promise.all(
      repos.map((repo) => fetchRepoContributorStats(repo.owner.login, repo.name, token)),
    ),
  ])

  const rateLimited = [...languageResponses, ...contributorResponses].find(
    (response) => response.isRateLimited,
  )

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

  // contributors stats は 202（集計準備中）を許容し、取れた範囲で「自分のコーディング量」を算出する
  const hardFailedContributorResponse = contributorResponses.find(
    (response) => !response.ok,
  )

  if (hardFailedContributorResponse) {
    return jsonError(
      `コーディング量の取得に失敗しました: ${hardFailedContributorResponse.errorMessage ?? 'unknown error'}`,
      502,
    )
  }

  const languageMaps = languageResponses
    .map((response) => response.data)
    .filter((data): data is Record<string, number> => data !== null)

  const contributorStatsList = contributorResponses.map((response) => response.data)

  const stats = aggregateLanguageStats(languageMaps)
  const codingActivity = aggregateCodingActivity(contributorStatsList, username)

  // クライアントには必要最小限の整形データのみ返す
  return NextResponse.json({
    languages: stats,
    codingActivity,
    contributionSummary,
    visibility: 'public_and_private_owner',
  })
}
