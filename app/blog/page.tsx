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
    <Container className="py-20">
      <section>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-100">Blog</h1>
        <p className="mt-3 text-zinc-400">実装メモや技術的な学びを、短く実践的に残していきます。</p>

        <ul className="mt-10 space-y-4">
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
