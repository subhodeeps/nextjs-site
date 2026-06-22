// src/mdx-components.tsx
import type { MDXComponents } from 'mdx/types'
import { mdxComponents as customComponents } from '@/lib/mdx/mdx-components'

// This function is required by Next.js to activate the MDX compiler globally
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...customComponents,
  }
}