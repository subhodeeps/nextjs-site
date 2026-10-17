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

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 
