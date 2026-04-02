import { cn } from '@/lib/utils'

type CardProps = {
  children: React.ReactNode
  className?: string
}

// 影ではなく境界線で区切る、GitHub風のカード
export function Card({ children, className }: CardProps) {
  return <div className={cn('rounded-lg border border-zinc-800 bg-zinc-900 p-5', className)}>{children}</div>
}
