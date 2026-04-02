import { evaluate } from '@mdx-js/mdx'
import { Fragment } from 'react'
import * as runtime from 'react/jsx-runtime'
import { visit } from 'unist-util-visit'

type HastNode = {
  type: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
  value?: string
}

function getNodeText(node: HastNode): string {
  if (node.type === 'text') return node.value ?? ''
  return (node.children ?? []).map((child) => getNodeText(child)).join('')
}

// 見出しにアンカーを付与して、将来TOCを追加しやすい構造にする
function rehypeHeadingAnchor() {
  return (tree: HastNode) => {
    visit(tree as never, 'element', (node: HastNode) => {
      if (!node.tagName || !['h2', 'h3'].includes(node.tagName)) return

      const text = getNodeText(node)
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')

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
          children: [{ type: 'text', value: '#' }],
        },
        ...(node.children ?? []),
      ]
    })
  }
}

export async function renderMdx(content: string) {
  const { default: MdxContent } = await evaluate(content, {
    ...runtime,
    Fragment,
    rehypePlugins: [rehypeHeadingAnchor],
  })

  return <MdxContent />
}
