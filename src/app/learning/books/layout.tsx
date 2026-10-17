// src/app/learning/books/layout.tsx
//
// The layout for /learning/books and every page below it. It only sets the metadata, the
// counterpart of Jekyll front matter: the title in the browser tab, the
// description, and the text and image of link previews on social media. The
// page itself is page.tsx in the same folder.
import { Metadata } from 'next'
import { ogImages } from '@/lib/og/og-images'

export const metadata: Metadata = {
    title: 'Books |subhodeep',
    description: "Notes and summaries from the books I'm reading to learn stuff",
    openGraph: {
        title: 'Books | subhodeep',
        description: "Notes and summaries from the books I'm reading to learn stuff",
        type: 'website',
        images: ogImages('learning'),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Books | subhodeep',
        description: "Notes and summaries from the books I'm reading to learn stuff",
        images: ogImages('learning'),
    },
}

/** Shows the page unchanged; this layout exists only for its metadata. */
export default function Layout({ children }: { children: React.ReactNode }) {
    return children
}
