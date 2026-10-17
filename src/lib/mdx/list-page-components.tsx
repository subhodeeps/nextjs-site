// src/lib/mdx/list-page-components.tsx
//
// How Markdown is drawn on the reading lists under Learning (Physics References,
// and Essays and Articles Worth Reading), so that they look like the Marginalia
// page: a bold title, a short grey introduction, and a bulleted list of links in
// the site's small text. A page uses it as <Content components={listPageComponents} />;
// anything not listed here is drawn as in ./mdx-components.tsx.
import { MDXComponents } from 'mdx/types'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { cn } from '@/lib/utils/utils'
import { monoFont } from '@/styles/fonts/fonts'
import { mdxComponents } from './mdx-components'

export const listPageComponents: MDXComponents = {
    ...mdxComponents,

    // "# Title": the page title
    h1: ({ children }) => (
        <TextHeading as="h1" weight="bold" className="mb-2">
            {children}
        </TextHeading>
    ),

    // A paragraph (the introduction under the title), in grey
    p: ({ children }) => (
        <Text variant="muted" className="mb-12">
            {children}
        </Text>
    ),

    // The list, with grey bullets
    ul: ({ children }) => (
        <ul className="mb-12 list-disc pl-5 marker:text-muted-foreground">{children}</ul>
    ),

    // One item. As on the Marginalia page, the bullet keeps the full size and the
    // text inside is in the size and colour of <Text>. If the list has blank lines
    // between its items, Markdown wraps each item's text in a paragraph; the
    // [&>p] classes keep that paragraph from taking the introduction's look.
    li: ({ children }) => (
        <li className="mb-4 pl-2">
            <div
                className={cn(
                    'text-xs text-foreground sm:text-sm',
                    '[&>p]:mb-0 [&>p]:text-[length:inherit] [&>p]:text-foreground',
                    monoFont.className,
                )}
            >
                {children}
            </div>
        </li>
    ),

    // Links: underlined in the faint accent colour, purple on hover. Links to
    // other websites open in a new tab.
    a: ({ href, children }) => (
        <a
            href={href}
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="underline decoration-accent-muted decoration-1 underline-offset-4 transition-colors hover:text-accent"
        >
            {children}
        </a>
    ),
}
