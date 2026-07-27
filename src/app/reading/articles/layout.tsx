import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Essays and Fiction Worth Reading',
    description: 'Some essays and fiction that I have enjoyed reading.',
    openGraph: {
        title: 'Essays and Fiction Worth Reading',
        description: 'Some essays and fiction that I have enjoyed reading.',
        type: 'article',
        publishedTime: '2025-01-14T00:00:00.000Z',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Essays and Fiction Worth Reading',
        description: 'Some essays and fiction that I have enjoyed reading.',
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}