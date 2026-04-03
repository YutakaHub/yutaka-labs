import Box from '@mui/material/Box'
import CardActionArea from '@mui/material/CardActionArea'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import NextLink from '@/components/ui/next-link'
import type { PostMeta } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

type PostCardProps = {
  post: PostMeta
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card
      sx={(theme) => ({
        transition: theme.transitions.create('background-color'),
        '&:hover': {
          bgcolor: 'action.hover',
        },
      })}
    >
      <CardActionArea component={NextLink} href={`/blog/${post.slug}`} sx={{ px: 3, py: 2.5 }}>
        <Stack spacing={2}>
          <Box sx={(theme) => theme.appLayouts.metaRow}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingMinutes} min read</span>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontSize: '1.25rem', fontWeight: 500 }}>
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {post.description}
            </Typography>
          </Box>

          <Box sx={(theme) => theme.appLayouts.tagRow}>
            {post.tags.map((tag) => (
              <Badge key={tag}>#{tag}</Badge>
            ))}
          </Box>
        </Stack>
      </CardActionArea>
    </Card>
  )
}
