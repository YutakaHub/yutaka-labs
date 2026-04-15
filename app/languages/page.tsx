'use client'

import { useEffect, useMemo, useState } from 'react'
import type { LanguageStat } from '@/lib/github-language'

type ApiError = {
  error?: string
}

export default function LanguagesPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<LanguageStat[]>([])

  const totalBytes = useMemo(
    () => stats.reduce((sum, item) => sum + item.bytes, 0),
    [stats],
  )

  const fetchLanguageStats = async () => {
    setLoading(true)
    setError(null)

    try {
      // ブラウザ側は自前APIだけを叩き、GitHub APIはサーバー側に閉じ込める
      const response = await fetch('/api/github-languages', {
        method: 'GET',
        cache: 'no-store',
      })

      if (!response.ok) {
        const errorJson = (await response.json()) as ApiError
        setError(errorJson.error ?? 'データの取得に失敗しました。')
        setStats([])
        return
      }

      const data = (await response.json()) as LanguageStat[]
      setStats(data)
    } catch {
      setError('通信エラーが発生しました。ネットワーク状態を確認してください。')
      setStats([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchLanguageStats()
  }, [])

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold">GitHub Language Stats</h1>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">
        環境変数に設定した GitHub ユーザーの公開リポジトリ言語使用率を表示します。
      </p>


      {loading ? (
        <p className="mt-4 text-sm">ローディング中...</p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}


      <section className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
        {/* 一覧に表示している数値の意味を先に説明し、初見でも読み取りやすくする */}
        <h2 className="text-sm font-semibold text-[var(--foreground)]">この一覧で分かること</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted-foreground)]">
          <li>name: 使用言語の名前です（例: TypeScript）。</li>
          <li>bytes: リポジトリ内でその言語が占めるコード量（バイト数）です。</li>
          <li>percent: 全言語合計に対する、その言語の割合です。</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">結果一覧</h2>

        {!loading && !error && stats.length === 0 ? (
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            集計結果がありません。公開リポジトリと言語情報を確認してください。
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
    </main>
  )
}
