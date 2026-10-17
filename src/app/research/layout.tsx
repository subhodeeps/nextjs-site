import { Metadata } from 'next'
import { ogImages } from '@/lib/og/og-images'

export const metadata: Metadata = {
    title: 'Research | subhodeep',
    description: 'My research and publications',
    openGraph: {
        title: 'Research | subhodeep',
        description: 'My research and publications',
        type: 'website',
        images: ogImages('research'),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Research | subhodeep',
        description: 'My research and publications',
        images: ogImages('research'),
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 