import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Container } from '@/components/layout/container'
import NextLink from '@/components/ui/next-link'
import GitHubIcon from '@/components/ui/github-icon'

export function Header() {
  return (
    <Box
      component="header"
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'rgba(9, 9, 11, 0.95)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <Container
        sx={{
          minHeight: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          component={NextLink}
          href="/"
          variant="body2"
          color="text.primary"
          sx={{ fontWeight: 600, letterSpacing: '0.08em' }}
        >
          Yutaka Labs
        </Link>

        <Box
          component="nav"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            color: 'text.secondary',
          }}
        >
          <Link
            component={NextLink}
            href="/blog"
            variant="body2"
            color="inherit"
            sx={{ transition: 'color 0.2s ease', '&:hover': { color: 'text.primary' } }}
          >
            Blog
          </Link>
          <GitHubIcon />
        </Box>
      </Container>
    </Box>
  )
}
