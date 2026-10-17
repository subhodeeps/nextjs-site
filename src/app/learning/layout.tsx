import { Metadata } from 'next'
import { ogImages } from '@/lib/og/og-images'

export const metadata: Metadata = {
    title: 'Learning | subhodeep',
    description: 'A collection of references and notes from my learning journey',
    openGraph: {
        title: 'Learning | subhodeep',
        description: 'A collection of references and notes from my learning journey',
        type: 'website',
        images: ogImages('learning'),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Learning | subhodeep',
        description: 'A collection of references and notes from my learning journey',
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



