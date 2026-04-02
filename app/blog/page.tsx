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
    <Container className="py-16">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">Blog</h1>
        <p className="mt-2 text-sm text-zinc-400">GitHubのIssue一覧のように、更新順で記事を並べています。</p>

        <ul className="mt-6 space-y-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}
