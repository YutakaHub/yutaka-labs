import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Container } from '@/components/layout/container'
import { getGitHubProfileUrl } from '@/lib/github'

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
          <a
            href={getGitHubProfileUrl()}
            target="_blank"
            rel="noreferrer"
            className="rounded px-1.5 py-1 transition-colors hover:text-[var(--foreground)]"
          >
            GitHub
          </a>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  )
}
