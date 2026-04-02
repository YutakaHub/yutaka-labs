import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { GitHubAvatar } from '@/components/profile/github-avatar'

export async function Header() {
  return (
    <header className="border-b border-zinc-900/80">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-wide text-zinc-100">
          Yutaka Labs
        </Link>

        <nav className="flex items-center gap-4 text-sm text-zinc-400">
          <Link href="/blog" className="transition hover:text-zinc-100">
            Blog
          </Link>
          <a
            href="https://github.com/YutakaHub"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-zinc-100"
          >
            GitHub
          </a>

          {/* GitHub風の控えめなアバター表示 */}
          <GitHubAvatar />
        </nav>
      </Container>
    </header>
  )
}
