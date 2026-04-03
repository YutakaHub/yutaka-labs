import type { Post } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

type PostHeaderProps = {
  post: Pick<Post, 'title' | 'date' | 'description' | 'readingMinutes' | 'tags'>
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-10 border-b border-[var(--border)] pb-5">
      <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted-foreground)]">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>•</span>
        <span>{post.readingMinutes} min read</span>
      </div>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">{post.title}</h1>
      <p className="mt-2 text-base text-[var(--muted-foreground)]">{post.description}</p>

      {post.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-xs text-[var(--muted-foreground)]"
            >
              #{tag}
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
