import { Metadata } from 'next'
import { ogImages } from '@/lib/og/og-images'

export const metadata: Metadata = {
    title: 'Books |subhodeep',
    description: 'Notes and summaries from the books I\'m reading to learn stuff',
    openGraph: {
        title: 'Books | subhodeep',
        description: 'Notes and summaries from the books I\'m reading to learn stuff',
        type: 'website',
        images: ogImages('learning'),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Books | subhodeep',
        description: 'Notes and summaries from the books I\'m reading to learn stuff',
        images: ogImages('learning'),
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 