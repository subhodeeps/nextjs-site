import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Reading | subhodeep',
    description: 'Books I am reading',
    openGraph: {
        title: 'Reading | subhodeep',
        description: 'Books I am reading',
        type: 'website',
        images: [
            {
                url: '/reading/opengraph-image.png',
                width: 1200,
                height: 630,
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Reading | subhodeep',
        description: 'Books I am reading',
        images: ['/reading/twitter-image.png'],
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 