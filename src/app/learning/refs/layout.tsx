import { Metadata } from 'next'



export const metadata: Metadata = {
    title: 'References',
    description: 'refs',
    openGraph: {
        title: 'References',
        description: 'refs',
        type: 'article',
        publishedTime: '2025-01-20T00:00:00.000Z',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'References',
        description: 'refs',
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 
