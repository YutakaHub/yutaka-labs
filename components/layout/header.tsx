import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { GitHubAvatar } from '@/components/profile/github-avatar'
import GitHubIcon from '../ui/github-icon'

export async function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/95">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-wide text-zinc-100">
          Yutaka Labs
        </Link>

        <nav className="flex items-center gap-4 text-sm text-zinc-400">
          <Link href="/blog" className="transition-colors hover:text-zinc-100">
            Blog
          </Link>
          <GitHubIcon />
        </nav>
      </Container>
    </header>
  )
}
