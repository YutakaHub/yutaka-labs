'use client'

import { CodingActivityPanel } from '@/components/languages/coding-activity-panel'
import { ContributionRadarChart } from '@/components/languages/contribution-radar-chart'
import { LanguageExplanationPanel } from '@/components/languages/language-explanation-panel'
import { LanguageStatsList } from '@/components/languages/language-stats-list'
import { useGitHubLanguagesData } from '@/components/languages/use-github-languages-data'

export default function LanguagesPage() {
  const {
    loading,
    error,
    stats,
    totalBytes,
    response,
  } = useGitHubLanguagesData()

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold">GitHub Language Stats</h1>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">
        公開 + 非公開（owner）のリポジトリから取得した言語バイト数を合算し、言語の割合を表示します。
      </p>

      {loading ? (
        <p className="mt-4 text-sm">ローディング中...</p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {response?.contributionSummary ? (
        <ContributionRadarChart metrics={response.contributionSummary.metrics} />
      ) : null}

      {response?.codingActivity ? (
        <CodingActivityPanel codingActivity={response.codingActivity} />
      ) : null}

      <LanguageExplanationPanel />

      <LanguageStatsList
        stats={stats}
        loading={loading}
        error={error}
        totalBytes={totalBytes}
      />
    </main>
  )
}
