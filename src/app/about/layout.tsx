// src/app/about/layout.tsx
//
// The layout for /about and every page below it. It only sets the metadata, the
// counterpart of Jekyll front matter: the title in the browser tab, the
// description, and the text and image of link previews on social media. The
// title is the page's own, from src/content/about.md. The page itself is
// page.tsx in the same folder.
import { Metadata } from 'next'
import { ogImages } from '@/lib/og/og-images'
import { getAbout } from '@/lib/about/about'

/** The metadata, worked out when the site is built */
export function generateMetadata(): Metadata {
    const title = `${getAbout().title} | subhodeep`
    return {
        title,
        description: "I don't really know what I'm doing",

        openGraph: {
            title,
            description: "I don't really know what I'm doing",
            type: 'website',
            images: ogImages('about'),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: "I don't really know what I'm doing",
            images: ogImages('about'),
        },
    }
}

/** Shows the page unchanged; this layout exists only for its metadata. */
export default function Layout({ children }: { children: React.ReactNode }) {
    return children
}
