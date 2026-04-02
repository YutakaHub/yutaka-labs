import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import { Fragment } from 'react'
import { visit } from 'unist-util-visit'

type HastNode = {
  type: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
  value?: string
}

// 見出しテキストからアンカー用のIDを生成する
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function getNodeText(node: HastNode): string {
  if (node.type === 'text') {
    return node.value ?? ''
  }

  return (node.children ?? []).map((child) => getNodeText(child)).join('')
}

// rehypeプラグイン: h2/h3にアンカーリンクを付与する
function rehypeHeadingAnchor() {
  return (tree: HastNode) => {
    visit(tree as never, 'element', (node: HastNode) => {
      if (!node.tagName || !['h2', 'h3'].includes(node.tagName)) return

      const text = getNodeText(node)
      const id = slugify(text)

      node.properties = { ...(node.properties ?? {}), id }
      node.children = [
        {
          type: 'element',
          tagName: 'a',
          properties: {
            href: `#${id}`,
            className: ['heading-anchor'],
            'aria-label': `${text} へのリンク`,
          },
          children: [
            {
              type: 'text',
              value: '#',
            },
          ],
        },
        ...(node.children ?? []),
      ]
    })
  }
}

const KEYWORDS = new Set([
  'const',
  'let',
  'function',
  'return',
  'import',
  'export',
  'async',
  'await',
  'if',
  'else',
  'type',
  'interface',
])

// rehypeプラグイン: 軽量なキーワード色付けでコードブロックを装飾する
function rehypeCodeHighlight() {
  return (tree: HastNode) => {
    visit(tree as never, 'element', (node: HastNode) => {
      if (node.tagName !== 'code') return

      const className = node.properties?.className
      const languageClass = Array.isArray(className)
        ? className.find((c) => typeof c === 'string' && c.startsWith('language-'))
        : null

      if (!languageClass) return

      const raw = getNodeText(node)
      const tokens = raw.split(/(\b)/)

      node.children = tokens.map((token) => {
        if (KEYWORDS.has(token)) {
          return {
            type: 'element',
            tagName: 'span',
            properties: { className: ['token-keyword'] },
            children: [{ type: 'text', value: token }],
          }
        }

        return {
          type: 'text',
          value: token,
        }
      })
    })
  }
}

export async function renderMdx(content: string) {
  const { default: MdxContent } = await evaluate(content, {
    ...runtime,
    Fragment,
    rehypePlugins: [rehypeHeadingAnchor, rehypeCodeHighlight],
  })

  return <MdxContent />
}
