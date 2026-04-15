'use client'

import { useEffect, useMemo, useState } from 'react'
import type {
  LanguagesApiResponse,
  LanguageStat,
} from '@/lib/github-language'

type ApiError = {
  error?: string
}

export function useGitHubLanguagesData() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<LanguageStat[]>([])

  const totalBytes = useMemo(
    () => stats.reduce((sum, item) => sum + item.bytes, 0),
    [stats],
  )

  useEffect(() => {
    const fetchLanguageStats = async () => {
      setLoading(true)
      setError(null)

      try {
        // ブラウザ側は自前APIだけを叩き、GitHub APIはサーバー側に閉じ込める
        const fetchResponse = await fetch('/api/github-languages', {
          method: 'GET',
          cache: 'no-store',
        })

        if (!fetchResponse.ok) {
          const errorJson = (await fetchResponse.json()) as ApiError
          setError(errorJson.error ?? 'データの取得に失敗しました。')
          setStats([])
          return
        }

        const data = (await fetchResponse.json()) as LanguagesApiResponse
        setStats(data.languages)
      } catch {
        setError('通信エラーが発生しました。ネットワーク状態を確認してください。')
        setStats([])
      } finally {
        setLoading(false)
      }
    }

    void fetchLanguageStats()
  }, [])

  return {
    loading,
    error,
    stats,
    totalBytes,
  }
}
