// src/app/reading/layout.tsx
//
// The layout for /reading and every page below it. It only sets the metadata, the
// counterpart of Jekyll front matter: the title in the browser tab, the
// description, and the text and image of link previews on social media. The
// page itself is page.tsx in the same folder.
import { Metadata } from 'next'
import { ogImages } from '@/lib/og/og-images'

export const metadata: Metadata = {
    title: 'Reading | subhodeep',
    description:
        "Notes on things I've read, links to pieces I love, plus the books I'm trying to get through.",
    openGraph: {
        title: 'Reading | subhodeep',
        description:
            "Notes on things I've read, links to pieces I love, plus the books I'm trying to get through.",
        type: 'website',
        images: ogImages('reading'),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Reading | subhodeep',
        description:
            "Notes on things I've read, links to pieces I love, plus the books I'm trying to get through.",
        images: ogImages('reading'),
    },
}

/** Shows the page unchanged; this layout exists only for its metadata. */
export default function Layout({ children }: { children: React.ReactNode }) {
    return children
}
