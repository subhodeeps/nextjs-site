// src/lib/mdx/mdx-components.tsx
//
// How Markdown is drawn on the site. When an .mdx file is turned into a page,
// each Markdown element is rendered by the matching entry below: a "# Title"
// line by h1, a paragraph by p, a [link](...) by a, a fenced code block by
// code, and so on. This is where to change how posts and notes look. (Next.js
// finds this list through src/mdx-components.tsx.)
//
// Each entry is a small component: `({ children }) => (...)` takes the
// element's content, `children`, and returns the HTML to draw around it.

import { Fragment } from 'react'
import { MDXComponents } from 'mdx/types'
import Ruler from '@/components/ui/ruler/ruler'
import { cn } from '@/lib/utils/utils'
import { headingFont, monoFont } from '@/styles/fonts/fonts'
import CodeBlock from '@/components/blocks/code-block/code-block'

/**
 * An image caption, with each [text](address) in it turned into a link that
 * opens in a new tab. split() with a capturing pattern keeps the matches: plain
 * text sits at every third position, each link's text and address after it.
 */
function CaptionText({ text }: { text: string }) {
    const parts = text.split(/\[([^\]]+)\]\(([^)\s]+)\)/)
    return (
        <>
            {parts.map((part, i) => {
                if (i % 3 === 0) return <Fragment key={i}>{part}</Fragment>
                if (i % 3 === 2) return null
                return (
                    <a
                        key={i}
                        href={parts[i + 1]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-accent-muted/50 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent-muted"
                    >
                        {part}
                    </a>
                )
            })}
        </>
    )
}

export const mdxComponents: MDXComponents = {
    // Headings use the heading font (Fira Code); dark:... sets the dark-theme colour
    h1: ({ children }) => (
        <h1
            className={cn(
                'mt-10 mb-6 text-2xl sm:text-3xl font-bold tracking-tight text-foreground dark:text-amore-slate-shade',
                headingFont.className,
            )}
        >
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2
            className={cn(
                'mt-8 mb-4 text-xl sm:text-2xl font-bold tracking-tight text-foreground dark:text-amore-slate-shade',
                headingFont.className,
            )}
        >
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3
            className={cn(
                'mt-6 mb-4 text-lg sm:text-xl font-semibold tracking-tight text-foreground dark:text-amore-slate-shade',
                headingFont.className,
            )}
        >
            {children}
        </h3>
    ),
    h4: ({ children }) => (
        <h4
            className={cn(
                'mt-6 mb-4 text-base sm:text-lg font-semibold tracking-tight text-foreground dark:text-amore-slate-shade',
                headingFont.className,
            )}
        >
            {children}
        </h4>
    ),

    // Paragraphs: 15px on phones, 16px from the sm: width up, with tall line spacing
    p: ({ children }) => (
        <p
            className={cn(
                'mb-6 text-[15px] sm:text-base leading-loose sm:leading-[1.8] text-foreground',
                monoFont.className,
            )}
        >
            {children}
        </p>
    ),

    // Lists: indented, spaced items with dimmed bullets and numbers
    ul: ({ children }) => (
        <ul
            className={cn(
                'mb-6 ml-6 list-disc space-y-3 text-[15px] sm:text-base leading-loose sm:leading-[1.8] text-foreground marker:text-muted-foreground',
                monoFont.className,
            )}
        >
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol
            className={cn(
                'mb-6 ml-6 list-decimal space-y-3 text-[15px] sm:text-base leading-loose sm:leading-[1.8] text-foreground marker:text-muted-foreground',
                monoFont.className,
            )}
        >
            {children}
        </ol>
    ),
    li: ({ children }) => <li className={cn('pl-2', monoFont.className)}>{children}</li>,

    // **bold** and *italic* text
    strong: ({ children }) => (
        <strong
            className={cn(
                'font-bold text-foreground dark:text-amore-slate-shade',
                monoFont.className,
            )}
        >
            {children}
        </strong>
    ),
    em: ({ children }) => (
        <span className={cn('italic text-muted-foreground', monoFont.className)}>{children}</span>
    ),

    // Markdown wraps code blocks in <pre><code>. The <pre> is dropped here, and the
    // code entry below draws the whole block, so there are not two boxes.
    pre: ({ children }) => <>{children}</>,

    // Both `inline code` and fenced code blocks arrive here. A fenced block with a
    // language (```bash) has className "language-bash"; inline code has none.
    code: ({ children, className }) => {
        // Pull the language name out of "language-bash", if there is one
        const match = /language-(\w+)/.exec(className || '')
        const language = match ? match[1] : ''

        if (!language) {
            // Inline code: tinted accent background, accent text
            return (
                <code
                    className={cn(
                        monoFont.className,
                        'px-1.5 py-0.5 mx-0.5 my-0.5',
                        'bg-accent-subtle',
                        'text-accent',
                        'rounded-md text-[0.85em]',
                        'inline-block leading-normal',
                    )}
                >
                    {children}
                </code>
            )
        }

        // A code block: highlighted, with a copy button (components/blocks/code-block)
        return (
            <div className="my-8">
                <CodeBlock code={children as string} language={language} />
            </div>
        )
    },

    // > quoted text
    blockquote: ({ children }) => (
        <blockquote
            className={cn(
                'pl-4 border-l-2 border-accent-muted/50',
                'my-6 italic',
                'text-muted-foreground',
                monoFont.className,
            )}
        >
            {children}
        </blockquote>
    ),

    // A --- line becomes a horizontal rule
    hr: () => <Ruler color="gray" marginTop="lg" marginBottom="lg" />,

    // ![description](/path/image.png "Caption"): the image across the full width,
    // with rounded corners and a faint border, and the caption (the text in quotes,
    // if any) in small grey type under it; a link in the caption is written as in
    // Markdown, [text](address). The description is read out by screen readers.
    // Markdown puts an image inside a paragraph, where a <figure> is not allowed,
    // so the parts are <span>s shown as blocks.
    img: ({ src, alt, title }) => (
        <span className="my-8 block">
            {/* A plain <img>: the site is a static export, so Next.js's <Image>
                would not resize it anyway, and the size of an image in a post
                is not known in advance */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt ?? ''}
                loading="lazy"
                className="block h-auto w-full rounded-lg border border-border"
            />
            {title && (
                <span
                    className={cn(
                        'mt-2 block text-center text-xs text-muted-foreground',
                        monoFont.className,
                    )}
                >
                    <CaptionText text={title} />
                </span>
            )}
        </span>
    ),

    // Links: body-coloured text with a faint accent underline. Links to other
    // websites (starting with http) open in a new tab.
    a: ({ href, children }) => (
        <a
            href={href}
            className={cn(
                'text-foreground dark:text-amore-slate-shade font-medium',
                'transition-colors duration-200',
                'underline underline-offset-4',
                'decoration-accent-muted/50 hover:decoration-accent-muted',
                monoFont.className,
            )}
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
            {children}
        </a>
    ),
}
