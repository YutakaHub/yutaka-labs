'use client'

import { useAppTheme } from '@/components/providers/app-theme-provider'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useAppTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium transition-colors',
        'border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)]',
        'hover:bg-[var(--subtle)] hover:text-[var(--foreground)]',
      )}
      aria-label="テーマを切り替える"
    >
      {/* hydration時の文言差分を抑えるため、ラベルの警告のみ抑止する */}
      <span suppressHydrationWarning>{isDark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
