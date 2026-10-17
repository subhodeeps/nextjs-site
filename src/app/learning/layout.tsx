// src/app/learning/layout.tsx
//
// The layout for /learning and every page below it. It only sets the metadata, the
// counterpart of Jekyll front matter: the title in the browser tab, the
// description, and the text and image of link previews on social media. The
// page itself is page.tsx in the same folder.
import { Metadata } from 'next'
import { ogImages } from '@/lib/og/og-images'

export const metadata: Metadata = {
    title: 'Learning | subhodeep',
    description: 'A collection of references and notes from my learning journey',
    openGraph: {
        title: 'Learning | subhodeep',
        description: 'A collection of references and notes from my learning journey',
        type: 'website',
        images: ogImages('learning'),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Learning | subhodeep',
        description: 'A collection of references and notes from my learning journey',
        images: ogImages('learning'),
    }
}
/** Shows the page unchanged; this layout exists only for its metadata. */
export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
