import { cn } from '@/lib/utils'

type BadgeProps = {
  children: React.ReactNode
  className?: string
}

// GitHubのラベル風に、控えめな境界線で情報を補助する
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-zinc-700 px-2 py-0.5 text-xs text-zinc-300',
        className,
      )}
    >
      {children}
    </span>
  )
}
