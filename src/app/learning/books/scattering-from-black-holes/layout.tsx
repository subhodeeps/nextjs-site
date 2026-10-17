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

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 
