import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/container'
import { PostHeader } from '@/components/blog/post-header'
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
    return { title: 'Post Not Found' }
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const content = await renderMdx(post.content)

  return (
    <Container className="py-16">
      {/* 記事本文は横幅を制限して可読性を優先 */}
      <article className="mx-auto max-w-3xl">
        <PostHeader post={post} />
        <div className="prose prose-invert max-w-none">{content}</div>
      </article>
    </Container>
  )
}
