import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'solid' | 'outline'
  external?: boolean
}

// 無駄な装飾を省いた、ナビゲーション用の小さなボタン
export function Button({ href, children, variant = 'outline', external = false }: ButtonProps) {
  const className = cn(
    'inline-flex items-center rounded-md border px-4 py-2 text-sm transition-colors',
    variant === 'solid'
      ? 'border-blue-500 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20'
      : 'border-zinc-700 text-zinc-200 hover:bg-zinc-800',
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}
