'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Container } from '@/components/layout/container'
import { cn } from '@/lib/utils'

const tabs = [
  { label: 'Home', href: '/', match: (pathname: string) => pathname === '/' },
  { label: 'Blog', href: '/blog', match: (pathname: string) => pathname.startsWith('/blog') },
  {
    label: 'Languages',
    href: '/languages',
    match: (pathname: string) => pathname.startsWith('/languages'),
  },
]

export function HeaderNav() {
  const pathname = usePathname()

  return (
    <Container>
      <nav className="flex h-11 items-end gap-1" aria-label="Section navigation">
        {tabs.map((tab) => {
          const isActive = tab.match(pathname)

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                // GitHubのタブ風に、下線で現在位置を示す
                'inline-flex h-full items-center border-b-2 px-3 text-sm transition-colors',
                isActive
                  ? 'border-[var(--foreground)] font-semibold text-[var(--foreground)]'
                  : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]',
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>
    </Container>
  )
}
