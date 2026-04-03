import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Container } from '@/components/layout/container'

export function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 3 }}>
      <Container>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Yutaka Labs
        </Typography>
      </Container>
    </Box>
  )
}
