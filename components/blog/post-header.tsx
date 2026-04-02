import { Badge } from '@/components/ui/badge'
import type { Post } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

type PostHeaderProps = {
  post: Pick<Post, 'title' | 'date' | 'description' | 'readingMinutes' | 'tags'>
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-8 border-b border-zinc-800 pb-6">
      <div className="flex items-center justify-between gap-3 text-xs text-zinc-400">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{post.readingMinutes} min read</span>
      </div>

      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">{post.title}</h1>
      <p className="mt-3 text-zinc-400">{post.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Badge key={tag}>#{tag}</Badge>
        ))}
      </div>
    </header>
  )
}
