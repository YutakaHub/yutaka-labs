import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { GitHubIcon } from '@/components/ui/github-icon'
import { getGitHubProfileUrl } from '@/lib/github'

export default function HomePage() {
  return (
    <Container sx={(theme) => ({ py: theme.appLayouts.heroSectionY })}>
      <Stack component="section" spacing={3}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: '0.08em' }}>
          Yutaka Labs
        </Typography>

        <Typography variant="h1" sx={{ maxWidth: 720, fontSize: { xs: '2.5rem', sm: '3rem' } }}>
          Minimal portfolio & engineering blog.
        </Typography>

        <Typography sx={{ maxWidth: 640 }} color="text.secondary">
          Next.js / TypeScript を軸に、実装メモとポートフォリオをまとめる個人サイトです。
          落ち着いたUIで、読みやすく再利用しやすい知見を蓄積します。
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          <Button href="/blog">Blog</Button>
          <Button href={getGitHubProfileUrl()} variant="solid" external>
            GitHub
          </Button>
        </Box>

        <GitHubIcon />
      </Stack>
    </Container>
  )
}
