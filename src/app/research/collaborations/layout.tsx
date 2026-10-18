// src/app/research/collaborations/layout.tsx
//
// The layout for /research/collaborations and every page below it. It only sets
// the metadata, the counterpart of Jekyll front matter: the title in the browser
// tab, the description, and the text and image of link previews on social media.
// The page itself is page.tsx in the same folder.
import { Metadata } from 'next'
import { ogImages } from '@/lib/og/og-images'

export const metadata: Metadata = {
    title: 'Collaborations (for lack of a better word) | subhodeep',
    description: 'My research collaborators and co-authors',
    openGraph: {
        title: 'Collaborations (for lack of a better word) | subhodeep',
        description: 'My research collaborators and co-authors, a.k.a. the real MVPs',
        type: 'website',
        images: ogImages('collaborations'),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Collaborations (for lack of a better word) | subhodeep',
        description: 'My research collaborators and co-authors, a.k.a. the real MVPs',
        images: ogImages('collaborations'),
    },
}

/** Shows the page unchanged; this layout exists only for its metadata. */
export default function Layout({ children }: { children: React.ReactNode }) {
    return children
}
