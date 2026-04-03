import type { ReactNode } from 'react'
import MuiButton from '@mui/material/Button'
import NextLink from '@/components/ui/next-link'

type ButtonProps = {
  href: string
  children: ReactNode
  variant?: 'solid' | 'outline'
  external?: boolean
}

// 無駄な装飾を省いた、ナビゲーション用の小さなボタン
export function Button({ href, children, variant = 'outline', external = false }: ButtonProps) {
  if (external) {
    return (
      <MuiButton
        component="a"
        href={href}
        target="_blank"
        rel="noreferrer"
        variant={variant === 'solid' ? 'contained' : 'outlined'}
        color={variant === 'solid' ? 'primary' : 'inherit'}
      >
        {children}
      </MuiButton>
    )
  }

  return (
    <MuiButton
      component={NextLink}
      href={href}
      variant={variant === 'solid' ? 'contained' : 'outlined'}
      color={variant === 'solid' ? 'primary' : 'inherit'}
    >
      {children}
    </MuiButton>
  )
}
