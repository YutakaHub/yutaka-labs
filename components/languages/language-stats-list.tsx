import type { LanguageStat } from '@/lib/github-language'

type LanguageStatsListProps = {
  stats: LanguageStat[]
  loading: boolean
  error: string | null
  totalBytes: number
}

export function LanguageStatsList({
  stats,
  loading,
  error,
  totalBytes,
}: LanguageStatsListProps) {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold">結果一覧</h2>

      {!loading && !error && stats.length === 0 ? (
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          集計結果がありません。公開/非公開リポジトリと言語情報を確認してください。
        </p>
      ) : null}

      {stats.length > 0 ? (
        <>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            合計: {totalBytes.toLocaleString('ja-JP')} bytes
          </p>
          <ul className="mt-3 space-y-2">
            {stats.map((stat) => (
              <li key={stat.name} className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">{stat.name}</span>
                  <span className="text-sm text-[var(--muted-foreground)]">{stat.percent.toFixed(1)}%</span>
                </div>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  {stat.bytes.toLocaleString('ja-JP')} bytes
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  )
}
