import fs from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export type PostMeta = {
  slug: string
  title: string
  date: string
  description: string
  readingMinutes: number
}

export type Post = PostMeta & {
  content: string
}

type Frontmatter = {
  title?: string
  date?: string
  description?: string
}

// 記事本文の単語数から読了時間(分)を計算する
function calculateReadingMinutes(content: string): number {
  const words = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/[\n\r]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.ceil(words / 220))
}

// MDXのfrontmatterを最小構成でパースする
function parseFrontmatter(raw: string): { frontmatter: Frontmatter; content: string } {
  if (!raw.startsWith('---')) {
    return { frontmatter: {}, content: raw }
  }

  const endIndex = raw.indexOf('\n---', 3)
  if (endIndex === -1) {
    return { frontmatter: {}, content: raw }
  }

  const rawFrontmatter = raw.slice(4, endIndex).trim()
  const content = raw.slice(endIndex + 4).trimStart()

  const frontmatter = rawFrontmatter.split('\n').reduce<Frontmatter>((acc, line) => {
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) return acc

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '')

    if (key === 'title' || key === 'date' || key === 'description') {
      acc[key] = value
    }
    return acc
  }, {})

  return { frontmatter, content }
}

async function readPostFile(slug: string): Promise<Post> {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  const raw = await fs.readFile(filePath, 'utf-8')
  const { frontmatter, content } = parseFrontmatter(raw)

  return {
    slug,
    title: frontmatter.title ?? slug,
    date: frontmatter.date ?? '1970-01-01',
    description: frontmatter.description ?? '',
    readingMinutes: calculateReadingMinutes(content),
    content,
  }
}

export const getAllPosts = cache(async (): Promise<PostMeta[]> => {
  const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true })

  const posts = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
      .map((entry) => readPostFile(entry.name.replace(/\.mdx$/, ''))),
  )

  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      description: post.description,
      readingMinutes: post.readingMinutes,
    }))
})

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  try {
    return await readPostFile(slug)
  } catch {
    return null
  }
})
