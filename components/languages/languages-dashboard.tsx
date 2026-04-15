'use client'

import { LanguageExplanationPanel } from '@/components/languages/language-explanation-panel'
import { LanguageStatsList } from '@/components/languages/language-stats-list'
import { useGitHubLanguagesData } from '@/components/languages/use-github-languages-data'

export function LanguagesDashboard() {
  const {
    loading,
    error,
    stats,
    totalBytes,
  } = useGitHubLanguagesData()

  return (
    <>
      {loading ? (
        <p className="mt-4 text-sm">ローディング中...</p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <LanguageExplanationPanel />

      <LanguageStatsList
        stats={stats}
        loading={loading}
        error={error}
        totalBytes={totalBytes}
      />
    </>
  )
}
