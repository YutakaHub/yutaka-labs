import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { PostMeta } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

type PostCardProps = {
  post: PostMeta
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <Card className="transition-colors hover:bg-zinc-800/60">
        <div className="flex items-center justify-between gap-3 text-xs text-zinc-400">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingMinutes} min read</span>
        </div>

        <h2 className="mt-2 text-xl font-medium text-zinc-100">{post.title}</h2>
        <p className="mt-2 text-sm text-zinc-400">{post.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag}>#{tag}</Badge>
          ))}
        </div>
      </Card>
    </Link>
  )
}
