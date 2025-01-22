import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog | subhodeep',
    description: 'Thoughts',
    openGraph: {
        title: 'Blog | subhodeep',
        description: 'Thoughts',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | subhodeep',
        description: 'Thoughts',
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 
