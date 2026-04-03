import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type CardProps = {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('rounded-md border border-[var(--border)] bg-[var(--surface)]', className)}>
      {children}
    </div>
  )
}
