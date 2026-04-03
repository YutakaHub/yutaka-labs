import type { ReactNode } from 'react'
import MuiCard from '@mui/material/Card'
import type { SxProps, Theme } from '@mui/material/styles'

type CardProps = {
  children: ReactNode
  className?: string
  sx?: SxProps<Theme>
}

// 影ではなく境界線で区切る、GitHub風のカード
export function Card({ children, className, sx }: CardProps) {
  return <MuiCard variant="outlined" className={className} sx={sx}>{children}</MuiCard>
}
