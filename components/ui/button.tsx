import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'solid' | 'outline'
  external?: boolean
}

// シンプルなリンクボタンとして利用する共通UI
export function Button({ href, children, variant = 'outline', external = false }: ButtonProps) {
  const className = cn(
    'inline-flex items-center rounded-full px-5 py-2.5 text-sm transition',
    variant === 'solid'
      ? 'bg-zinc-100 text-zinc-950 hover:bg-zinc-200'
      : 'border border-zinc-700 text-zinc-200 hover:bg-zinc-900',
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
