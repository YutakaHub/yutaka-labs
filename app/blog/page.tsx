import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="mb-10 text-4xl font-semibold tracking-tight">Blog</h1>

        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 transition hover:border-zinc-700 hover:bg-zinc-900"
              >
                <p className="text-xs text-zinc-400">
                  <time dateTime={post.date}>{post.date}</time> ・ {post.readingMinutes} min read
                </p>
                <h2 className="mt-2 text-2xl font-medium">{post.title}</h2>
                <p className="mt-2 text-sm text-zinc-300">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
