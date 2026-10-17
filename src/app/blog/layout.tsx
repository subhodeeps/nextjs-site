// src/app/blog/layout.tsx
//
// The layout for /blog and every page below it. It only sets the metadata, the
// counterpart of Jekyll front matter: the title in the browser tab, the
// description, and the text and image of link previews on social media. The
// page itself is page.tsx in the same folder.
import { Metadata } from 'next'
import { ogImages } from '@/lib/og/og-images'

// The blog's description in search results and link previews: the same line as
// the subtitle under the title, in _components/BlogHeader.tsx
const DESCRIPTION = 'on physics, math, and code, and random tangents'

export const metadata: Metadata = {
    title: 'Blog | subhodeep',
    description: DESCRIPTION,
    openGraph: {
        title: 'Blog | subhodeep',
        description: DESCRIPTION,
        type: 'website',
        images: ogImages('blog'),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | subhodeep',
        description: DESCRIPTION,
        images: ogImages('blog'),
    },
}

/** Shows the page unchanged; this layout exists only for its metadata. */
export default function Layout({ children }: { children: React.ReactNode }) {
    return children
}
