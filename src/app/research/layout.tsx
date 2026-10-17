// src/app/research/layout.tsx
//
// The layout for /research and every page below it. It only sets the metadata, the
// counterpart of Jekyll front matter: the title in the browser tab, the
// description, and the text and image of link previews on social media. The
// page itself is page.tsx in the same folder.
import { Metadata } from 'next'
import { ogImages } from '@/lib/og/og-images'

export const metadata: Metadata = {
    title: 'Research | subhodeep',
    description: 'My research and publications',
    openGraph: {
        title: 'Research | subhodeep',
        description: 'My research and publications',
        type: 'website',
        images: ogImages('research'),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Research | subhodeep',
        description: 'My research and publications',
        images: ogImages('research'),
    },
}

/** Shows the page unchanged; this layout exists only for its metadata. */
export default function Layout({ children }: { children: React.ReactNode }) {
    return children
}
