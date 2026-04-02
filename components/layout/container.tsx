import { cn } from '@/lib/utils'

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-4xl px-6', className)}>{children}</div>
}
