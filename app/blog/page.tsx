import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Container } from '@/components/layout/container'
import { PostCard } from '@/components/blog/post-card'
import { getAllPosts } from '@/lib/posts'

export const metadata = {
  title: 'Blog',
  description: 'Yutaka Labs の技術ブログ一覧',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <Container sx={(theme) => ({ py: theme.appLayouts.pageSectionY })}>
      <Stack component="section" spacing={3}>
        <div>
          <Typography variant="h2" sx={{ fontSize: '2rem' }}>
            Blog
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            GitHubのIssue一覧のように、更新順で記事を並べています。
          </Typography>
        </div>

        <Stack component="ul" spacing={1.5} sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </Stack>
      </Stack>
    </Container>
  )
}
