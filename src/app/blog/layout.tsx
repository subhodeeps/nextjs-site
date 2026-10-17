import { Metadata } from 'next'
import { ogImages } from '@/lib/og/og-images'

export const metadata: Metadata = {
    title: 'Blog | subhodeep',
    description: 'Thoughts',
    openGraph: {
        title: 'Blog | subhodeep',
        description: 'Thoughts',
        type: 'website',
        images: ogImages('blog'),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | subhodeep',
        description: 'Thoughts',
        images: ogImages('blog'),
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 
