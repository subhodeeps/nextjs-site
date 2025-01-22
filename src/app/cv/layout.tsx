import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Curriculum Vitae | subhodeep',
    description: 'Curriculum Vitae',
    openGraph: {
        title: 'Curriculum Vitae |subhodeep',
        description: 'Curriculum Vitae',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Curriculum Vitae | subhodeep',
        description: 'Curriculum Vitae',
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 