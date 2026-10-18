// src/components/ui/inline-links/inline-links.tsx
//
// Text with links written as in Markdown, [text](address), as used in the photo
// captions, the updates, the CV, the homepage and image captions in posts.
// <InlineLinks text="With [Anjan da](https://...) at IIT Madras" /> draws the
// text with the link in place. Links to other websites and to PDF files open in
// a new tab.
import { Fragment } from 'react'
import Link from 'next/link'

// A Markdown-style link: [text](address)
export const linkPattern = /\[([^\]]+)\]\(([^)\s]+)\)/

/** The attributes that make a link open in a new tab, for other websites and PDFs */
export function newTabProps(href: string) {
    return href.startsWith('http') || href.endsWith('.pdf')
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {}
}

/** The text without its link addresses: "With [Anjan da](...)" becomes "With Anjan da" */
export function stripLinks(text: string) {
    return text.replace(new RegExp(linkPattern.source, 'g'), '$1')
}

/**
 * If the whole text is a single link, its text and address; otherwise null.
 * The updates use this to show such an update entirely in the accent colour.
 */
export function wholeLink(text: string): { text: string; href: string } | null {
    const match = text.match(new RegExp(`^${linkPattern.source}$`))
    return match ? { text: match[1], href: match[2] } : null
}

/**
 * The text, with each [text](address) drawn as a link.
 *
 * @param text          the text
 * @param linkClassName Tailwind classes for the links
 */
export function InlineLinks({ text, linkClassName }: { text: string; linkClassName?: string }) {
    // split() with a capturing pattern keeps the matches: plain text sits at every
    // third position, and each link's text and address follow it
    const parts = text.split(new RegExp(linkPattern.source, 'g'))
    return (
        <>
            {parts.map((part, i) => {
                if (i % 3 === 0) return <Fragment key={i}>{part}</Fragment>
                if (i % 3 === 2) return null
                const href = parts[i + 1]
                // A page of this site opens without reloading the whole site
                if (href.startsWith('/') && !href.endsWith('.pdf')) {
                    return (
                        <Link key={i} href={href} className={linkClassName}>
                            {part}
                        </Link>
                    )
                }
                return (
                    <a key={i} href={href} {...newTabProps(href)} className={linkClassName}>
                        {part}
                    </a>
                )
            })}
        </>
    )
}
