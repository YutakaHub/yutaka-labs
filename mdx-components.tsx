import type { MDXComponents } from 'mdx/types'

// MDX内の要素マッピングを将来拡張しやすいように定義
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
