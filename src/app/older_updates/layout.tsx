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
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
