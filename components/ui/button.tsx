import type { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonProps = {
  href: string
  children: ReactNode
  variant?: 'solid' | 'outline'
  external?: boolean
}

export function Button({ href, children, variant = 'outline', external = false }: ButtonProps) {
  const baseClassName = cn(
    'inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors',
    variant === 'solid'
      ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] hover:opacity-90'
      : 'border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--subtle)]',
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={baseClassName}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={baseClassName}>
      {children}
    </Link>
  )
}
