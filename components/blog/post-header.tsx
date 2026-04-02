import type { Post } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

type PostHeaderProps = {
  post: Pick<Post, 'title' | 'date' | 'description' | 'readingMinutes' | 'tags'>
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-10 border-b border-zinc-900 pb-8">
      <p className="text-xs text-zinc-400">
        <time dateTime={post.date}>{formatDate(post.date)}</time> ・ {post.readingMinutes} min read
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-100">{post.title}</h1>
      <p className="mt-3 text-zinc-300">{post.description}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <li key={tag} className="rounded-full border border-zinc-700 px-2.5 py-1 text-xs text-zinc-300">
            #{tag}
          </li>
        ))}
      </ul>
    </header>
  )
}
