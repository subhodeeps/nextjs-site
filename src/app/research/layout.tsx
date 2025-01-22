import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Research | subhodeep',
    description: 'My research and publications',
    openGraph: {
        title: 'Research | subhodeep',
        description: 'My research and publications',
        type: 'website',
        images: [
            {
                url: '/learning/opengraph-image.png',
                width: 1200,
                height: 630,
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Research | subhodeep',
        description: 'My research and publications',
        images: ['/learning/twitter-image.png'],
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 