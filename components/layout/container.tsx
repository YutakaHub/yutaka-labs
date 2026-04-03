import type { ReactNode } from 'react'
import MuiContainer from '@mui/material/Container'
import type { SxProps, Theme } from '@mui/material/styles'

type ContainerProps = {
  children: ReactNode
  className?: string
  sx?: SxProps<Theme>
}

export function Container({ children, className, sx }: ContainerProps) {
  return (
    <MuiContainer maxWidth="md" className={className} sx={[{ px: { xs: 3, sm: 4 } }, sx]}>
      {children}
    </MuiContainer>
  )
}
