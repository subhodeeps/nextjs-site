// src/mdx-components.tsx
//
// Next.js looks for this file, under exactly this name, whenever it compiles MDX
// (Markdown that may contain components). It decides which component draws each
// Markdown element: every heading, paragraph, link and code block in an .mdx
// file is rendered by the matching entry in src/lib/mdx/mdx-components.tsx.
import type { MDXComponents } from 'mdx/types'
import { mdxComponents as customComponents } from '@/lib/mdx/mdx-components'

/**
 * Called by Next.js when it compiles MDX. Returns the component to use for each
 * Markdown element: the defaults first, then this site's own versions, which
 * replace them. (`...object` copies every entry of an object into this one, so
 * later entries win.) The name has to start with "use", because Next.js treats
 * it as a React hook.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        ...customComponents,
    }
}
