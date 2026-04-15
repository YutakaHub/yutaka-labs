import { LanguagesDashboard } from '@/components/languages/languages-dashboard'
import { GitHubProfileCard } from '@/components/profile/github-profile-card'

export default function LanguagesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold">GitHub Language Stats</h1>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">
        公開 + 非公開（owner）のリポジトリから取得した言語バイト数を合算し、言語の割合を表示します。
      </p>

      {/* Home から移した GitHub Snapshot を Languages ページ側で表示する */}
      <GitHubProfileCard />

      <LanguagesDashboard />
    </main>
  )
}
