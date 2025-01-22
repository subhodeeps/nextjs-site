import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Books |subhodeep',
    description: 'Notes and summaries from the books I\'m reading to learn stuff',
    openGraph: {
        title: 'Books | subhodeep',
        description: 'Notes and summaries from the books I\'m reading to learn stuff',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Books | subhodeep',
        description: 'Notes and summaries from the books I\'m reading to learn stuff',
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 