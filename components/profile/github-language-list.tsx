'use client'

import type { CSSProperties } from 'react'
import type { GitHubLanguageStat } from '@/lib/github'

type GitHubLanguageListProps = {
  languages: GitHubLanguageStat[]
}

export function GitHubLanguageList({ languages }: GitHubLanguageListProps) {
  return (
    <div className="space-y-3">
      {languages.map((language) => (
        <article key={language.name} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
          <div className="flex items-center justify-between gap-3 text-sm">
            <p className="font-medium text-[var(--foreground)]">{language.name}</p>
            <p className="text-[var(--muted-foreground)]">{language.percentage.toFixed(1)}%</p>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--subtle)]">
            <div
              className="h-full rounded-full bg-[var(--foreground)] motion-safe:animate-[language-bar-grow_900ms_ease-out_forwards]"
              style={
                {
                  // 各言語の最終幅を CSS 変数で渡し、0% からの伸長アニメーションを行う
                  '--language-width': `${language.percentage}%`,
                } as CSSProperties
              }
            />
          </div>
        </article>
      ))}
    </div>
  )
}
