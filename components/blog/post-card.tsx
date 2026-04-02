import Link from 'next/link'
import { Card } from '@/components/ui/card'
import type { PostMeta } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

type PostCardProps = {
  post: PostMeta
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <Card className="transition hover:border-zinc-700 hover:bg-zinc-900/80">
        <p className="text-xs text-zinc-400">
          <time dateTime={post.date}>{formatDate(post.date)}</time> ・ {post.readingMinutes} min read
        </p>
        <h2 className="mt-2 text-2xl font-medium text-zinc-100">{post.title}</h2>
        <p className="mt-2 text-sm text-zinc-300">{post.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-zinc-700 px-2.5 py-1 text-xs text-zinc-300">
              #{tag}
            </li>
          ))}
        </ul>
      </Card>
    </Link>
  )
}
