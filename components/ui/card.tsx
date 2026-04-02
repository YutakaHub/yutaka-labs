import { cn } from '@/lib/utils'

type CardProps = {
  children: React.ReactNode
  className?: string
}

// 上品な境界線を持つ、ブログカード用のベースUI
export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('rounded-2xl border border-zinc-800/90 bg-zinc-950/60 p-6', className)}>
      {children}
    </div>
  )
}
