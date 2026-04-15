'use client'

import type { ContributionMetric } from '@/lib/github-language'

type ContributionRadarChartProps = {
  metrics: ContributionMetric[]
  hasAnyRestrictedContributions?: boolean
  restrictedContributionsCount?: number
}

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, value))
}

function toPoint(
  center: number,
  radius: number,
  direction: 'top' | 'right' | 'bottom' | 'left',
) {
  if (direction === 'top') {
    return `${center},${center - radius}`
  }

  if (direction === 'right') {
    return `${center + radius},${center}`
  }

  if (direction === 'bottom') {
    return `${center},${center + radius}`
  }

  return `${center - radius},${center}`
}

export function ContributionRadarChart({
  metrics,
  hasAnyRestrictedContributions = false,
  restrictedContributionsCount = 0,
}: ContributionRadarChartProps) {
  const center = 120
  const maxRadius = 72

  const top = metrics.find((metric) => metric.key === 'reviews')
  const right = metrics.find((metric) => metric.key === 'issues')
  const bottom = metrics.find((metric) => metric.key === 'pull_requests')
  const left = metrics.find((metric) => metric.key === 'commits')

  if (!top || !right || !bottom || !left) {
    return null
  }

  const polygonPoints = [
    toPoint(center, (maxRadius * clampPercent(top.percent)) / 100, 'top'),
    toPoint(center, (maxRadius * clampPercent(right.percent)) / 100, 'right'),
    toPoint(center, (maxRadius * clampPercent(bottom.percent)) / 100, 'bottom'),
    toPoint(center, (maxRadius * clampPercent(left.percent)) / 100, 'left'),
  ].join(' ')

  return (
    <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <h2 className="text-sm font-semibold text-[var(--foreground)]">Contribution Balance（過去1年）</h2>
      <p className="mt-1 text-xs text-[var(--muted-foreground)]">
        Commit / PR / Review / Issue の比率を簡易グラフで表示しています。
      </p>


      {hasAnyRestrictedContributions ? (
        <p className="mt-2 text-xs text-amber-400">
          ※ 非公開や権限制限付きの貢献が {restrictedContributionsCount.toLocaleString('ja-JP')} 件あるため、
          表示値が GitHub プロフィールと完全一致しない場合があります。
        </p>
      ) : null}

      <div className="mt-4 flex items-center justify-center">
        <svg viewBox="0 0 240 240" className="h-64 w-64" aria-label="Contribution balance radar chart">
          {/* 背景の十字ライン */}
          <line x1={center} y1={center - maxRadius} x2={center} y2={center + maxRadius} stroke="#5ee56d" strokeWidth="2" />
          <line x1={center - maxRadius} y1={center} x2={center + maxRadius} y2={center} stroke="#5ee56d" strokeWidth="2" />

          {/* 貢献バランスの面 */}
          <polygon points={polygonPoints} fill="rgba(94,229,109,0.45)" stroke="#5ee56d" strokeWidth="2" />

          {/* 各軸の端点 */}
          {[top, right, bottom, left].map((metric) => {
            const direction =
              metric.key === 'reviews'
                ? 'top'
                : metric.key === 'issues'
                  ? 'right'
                  : metric.key === 'pull_requests'
                    ? 'bottom'
                    : 'left'
            const point = toPoint(center, (maxRadius * clampPercent(metric.percent)) / 100, direction)
            const [cx, cy] = point.split(',').map((value) => Number(value))

            return <circle key={metric.key} cx={cx} cy={cy} r="4" fill="#ffffff" stroke="#5ee56d" strokeWidth="2" />
          })}

          <text x={center} y={center - maxRadius - 16} textAnchor="middle" className="fill-[var(--muted-foreground)] text-[12px]">
            {top.percent.toFixed(0)}% Reviews
          </text>
          <text x={center + maxRadius + 12} y={center + 4} className="fill-[var(--muted-foreground)] text-[12px]">
            {right.percent.toFixed(0)}% Issues
          </text>
          <text x={center} y={center + maxRadius + 22} textAnchor="middle" className="fill-[var(--muted-foreground)] text-[12px]">
            {bottom.percent.toFixed(0)}% PRs
          </text>
          <text x={center - maxRadius - 12} y={center + 4} textAnchor="end" className="fill-[var(--muted-foreground)] text-[12px]">
            {left.percent.toFixed(0)}% Commits
          </text>
        </svg>
      </div>
    </div>
  )
}
