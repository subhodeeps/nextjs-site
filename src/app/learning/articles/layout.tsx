// src/app/learning/articles/layout.tsx
//
// The layout for /learning/articles and every page below it. It only sets the metadata, the
// counterpart of Jekyll front matter: the title in the browser tab, the
// description, and the text and image of link previews on social media. The
// page itself is page.tsx in the same folder.
import { Metadata } from 'next'
import { ogImages } from '@/lib/og/og-images'



export const metadata: Metadata = {
    title: 'Interesting Articles and Essays',
    description: 'that I have enjoyed reading',
    openGraph: {
        title: 'Interesting Articles and Essays',
        description: 'that I have enjoyed reading',
        type: 'article',
        publishedTime: '2025-01-20T00:00:00.000Z',
        images: ogImages('learning'),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Interesting Articles and Essays',
        description: 'that I have enjoyed reading',
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
