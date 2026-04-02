import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { renderMdx } from '@/lib/mdx'
import { getAllPosts, getPostBySlug } from '@/lib/posts'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Yutaka Labs',
    }
  }

  const title = `${post.title} | Yutaka Labs`

  return {
    title,
    description: post.description,
    openGraph: {
      title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const content = await renderMdx(post.content)

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <article className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-xs text-zinc-400">
          <time dateTime={post.date}>{post.date}</time> ・ {post.readingMinutes} min read
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{post.title}</h1>
        <p className="mt-3 text-zinc-300">{post.description}</p>

        <div className="prose prose-invert mt-12 max-w-none">{content}</div>
      </article>
    </main>
  )
}
