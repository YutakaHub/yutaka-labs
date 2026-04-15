import type { CodingActivitySummary } from '@/lib/github-language'

type CodingActivityPanelProps = {
  codingActivity: CodingActivitySummary
}

export function CodingActivityPanel({ codingActivity }: CodingActivityPanelProps) {
  return (
    <section className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <h2 className="text-sm font-semibold text-[var(--foreground)]">あなたのコーディング量（推定・参考情報）</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted-foreground)]">
        <li>コミット数: {codingActivity.commits.toLocaleString('ja-JP')}</li>
        <li>追加行数: {codingActivity.additions.toLocaleString('ja-JP')}</li>
        <li>削除行数: {codingActivity.deletions.toLocaleString('ja-JP')}</li>
        <li>対象リポジトリ数: {codingActivity.touchedRepos.toLocaleString('ja-JP')}</li>
      </ul>
    </section>
  )
}
