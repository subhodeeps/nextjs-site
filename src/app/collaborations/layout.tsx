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
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 