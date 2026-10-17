import { Metadata } from 'next'
import { ogImages } from '@/lib/og/og-images'

export const metadata: Metadata = {
    title: 'Reading | subhodeep',
    description: "Notes on things I've read, links to pieces I love, plus the books I'm trying to get through.",
    openGraph: {
        title: 'Reading | subhodeep',
        description: "Notes on things I've read, links to pieces I love, plus the books I'm trying to get through.",
        type: 'website',
        images: ogImages('reading'),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Reading | subhodeep',
        description: "Notes on things I've read, links to pieces I love, plus the books I'm trying to get through.",
        images: ogImages('reading'),
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}