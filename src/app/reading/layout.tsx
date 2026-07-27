import { Metadata } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
    title: 'Reading | subhodeep',
    description: "Notes on things I've read, links to pieces I love, plus the books I'm trying to get through.",
    openGraph: {
        title: 'Reading | subhodeep',
        description: "Notes on things I've read, links to pieces I love, plus the books I'm trying to get through.",
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
        description: "Notes on things I've read, links to pieces I love, plus the books I'm trying to get through.",
        images: ['/reading/twitter-image.png'],
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <SpeedInsights />
        </>
    )
}