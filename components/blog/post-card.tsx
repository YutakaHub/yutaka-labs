import Link from 'next/link'
import { Card } from '@/components/ui/card'
import type { PostMeta } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

type PostCardProps = {
  post: PostMeta
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden transition-colors hover:bg-[var(--subtle)]">
      <Link href={`/blog/${post.slug}`} className="block px-5 py-4">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-[var(--muted-foreground)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>•</span>
          <span>{post.readingMinutes} min read</span>
        </div>

        <h3 className="text-base font-semibold text-[var(--foreground)]">{post.title}</h3>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">{post.description}</p>

        {post.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-[var(--border)] bg-[var(--background)] px-2 py-0.5 text-xs text-[var(--muted-foreground)]"
              >
                #{tag}
              </li>
            ))}
          </ul>
        )}
      </Link>
    </Card>
  )
}
