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
    <Container className="py-12 sm:py-14">
      <section>
        <div className="mb-5 border-b border-[var(--border)] pb-4">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">Blog</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            GitHub の Issue 一覧のように、更新順で記事を並べています。
          </p>
        </div>

        <ul className="space-y-3">
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
