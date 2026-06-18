import { Metadata } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
    title: 'Collaborations (for lack of a better word) | subhodeep',
    description: 'My research collaborators and co-authors',
    openGraph: {
        title: 'Collaborations (for lack of a better word) | subhodeep',
        description: 'My research collaborators and co-authors, a.k.a. the real MVPs',
        type: 'website',
        images: [
            {
                url: '/collaborations/opengraph-image.png',
                width: 1200,
                height: 630,
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Collaborations (for lack of a better word) | subhodeep',
        description: 'My research collaborators and co-authors, a.k.a. the real MVPs',
        images: ['/collaborations/twitter-image.png'],
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 