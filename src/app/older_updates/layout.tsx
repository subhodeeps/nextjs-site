// src/app/older_updates/layout.tsx
//
// The layout for /older_updates and every page below it. It only sets the metadata, the
// counterpart of Jekyll front matter: the title in the browser tab, the
// description, and the text and image of link previews on social media. The
// page itself is page.tsx in the same folder.
import { Metadata } from 'next'
import { ogImages } from '@/lib/og/og-images'

export const metadata: Metadata = {
    title: 'Older Updates | subhodeep',
    description: 'Older news and updates',
    openGraph: {
        title: 'Older Updates | subhodeep',
        description: 'Older news and updates',
        type: 'website',
        images: ogImages('older_updates'),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Older Updates | subhodeep',
        description: 'Older news and updates',
        images: ogImages('older_updates'),
    },
}

/** Shows the page unchanged; this layout exists only for its metadata. */
export default function Layout({ children }: { children: React.ReactNode }) {
    return children
}
