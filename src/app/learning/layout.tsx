import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Learning | subhodeep',
    description: 'A collection of references and notes from my learning journey',
    openGraph: {
        title: 'Learning | subhodeep',
        description: 'A collection of references and notes from my learning journey',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Learning | subhodeep',
        description: 'A collection of references and notes from my learning journey',
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 



