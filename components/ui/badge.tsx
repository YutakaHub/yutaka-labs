import type { ReactNode } from 'react'
import Chip from '@mui/material/Chip'

type BadgeProps = {
  children: ReactNode
  className?: string
}

// GitHubのラベル風に、控えめな境界線で情報を補助する
export function Badge({ children, className }: BadgeProps) {
  return <Chip label={children} size="small" variant="outlined" className={className} />
}
