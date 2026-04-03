import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ContainerProps = {
  children: ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-5xl px-6', className)}>{children}</div>
}
