import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Badge } from '@/components/ui/badge'
import type { Post } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

type PostHeaderProps = {
  post: Pick<Post, 'title' | 'date' | 'description' | 'readingMinutes' | 'tags'>
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <Box component="header" sx={{ mb: 8, borderBottom: 1, borderColor: 'divider', pb: 3 }}>
      <Box sx={(theme) => theme.appLayouts.metaRow}>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{post.readingMinutes} min read</span>
      </Box>

      <Typography variant="h1" sx={{ mt: 2, fontSize: { xs: '2rem', sm: '2.5rem' } }}>
        {post.title}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1.5 }}>
        {post.description}
      </Typography>

      <Stack
        direction="row"
        useFlexGap
        flexWrap="wrap"
        sx={(theme) => ({
          ...theme.appLayouts.tagRow,
          mt: 3,
        })}
      >
        {post.tags.map((tag) => (
          <Badge key={tag}>#{tag}</Badge>
        ))}
      </Stack>
    </Box>
  )
}
