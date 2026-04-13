'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type GitHubMetricCounterProps = {
  value: number
  durationMs?: number
}

export function GitHubMetricCounter({
  value,
  durationMs = 1400,
}: GitHubMetricCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const frameIdRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const sanitizedValue = useMemo(() => Math.max(0, Math.floor(value)), [value])

  useEffect(() => {
    // GitHub から取得した値を見栄えよく段階的に表示する
    startTimeRef.current = null

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / durationMs, 1)
      const nextValue = Math.round(sanitizedValue * progress)
      setDisplayValue(nextValue)

      if (progress < 1) {
        frameIdRef.current = window.requestAnimationFrame(animate)
      }
    }

    frameIdRef.current = window.requestAnimationFrame(animate)

    return () => {
      if (frameIdRef.current !== null) {
        window.cancelAnimationFrame(frameIdRef.current)
      }
    }
  }, [durationMs, sanitizedValue])

  return <span>{displayValue.toLocaleString('ja-JP')}</span>
}
