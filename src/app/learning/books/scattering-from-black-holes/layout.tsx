// src/app/learning/books/scattering-from-black-holes/layout.tsx
//
// The layout for /learning/books/scattering-from-black-holes and every page below it. It only sets the metadata, the
// counterpart of Jekyll front matter: the title in the browser tab, the
// description, and the text and image of link previews on social media. The
// page itself is page.tsx in the same folder.
import { Metadata } from 'next'
import { ogImages } from '@/lib/og/og-images'

export const metadata: Metadata = {
    title: 'Scattering from black holes',
    description: '',
    openGraph: {
        title: 'Scattering from black holes',
        description: '',
        type: 'article',
        publishedTime: '2025-01-14T00:00:00.000Z',
        images: ogImages('learning'),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Scattering from black holes',
        description: '',
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
