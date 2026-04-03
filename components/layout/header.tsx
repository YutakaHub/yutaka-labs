import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Container } from '@/components/layout/container'
import { getGitHubProfileUrl } from '@/lib/github'

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
      <path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.2-3.3 4.3 4.3 0 0 1 .1-3.2s1-.3 3.4 1.3a11.7 11.7 0 0 1 6.1 0c2.3-1.6 3.4-1.3 3.4-1.3.5 1.1.5 2.4.1 3.2a4.7 4.7 0 0 1 1.2 3.3c0 4.7-2.8 5.7-5.5 6 .4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  )
}

export function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-wide text-[var(--foreground)]">
          Yutaka Labs
        </Link>

        <nav className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
          <Link href="/blog" className="rounded px-1.5 py-1 transition-colors hover:text-[var(--foreground)]">
            Blog
          </Link>

          {/* GitHubリンクはアイコン主体で主張を抑え、ナビに自然に馴染ませる */}
          <a
            href={getGitHubProfileUrl()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent transition-colors hover:border-[var(--border)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
            aria-label="GitHub profile"
            title="GitHub"
          >
            <GitHubMark />
          </a>

          <ThemeToggle />
        </nav>
      </Container>
    </header>
  )
}
