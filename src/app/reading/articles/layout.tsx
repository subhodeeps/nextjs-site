import { Metadata } from 'next'



export const metadata: Metadata = {
    title: 'Interesting Articles and Essays',
    description: 'that I have enjoyed reading',
    openGraph: {
        title: 'Interesting Articles and Essays',
        description: 'that I have enjoyed reading',
        type: 'article',
        publishedTime: '2025-01-20T00:00:00.000Z',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Interesting Articles and Essays',
        description: 'that I have enjoyed reading',
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 
