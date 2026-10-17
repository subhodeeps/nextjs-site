import { Metadata } from 'next'
import { ogImages } from '@/lib/og/og-images'

export const metadata: Metadata = {
    title: 'Curriculum Vitae | subhodeep',
    description: 'Curriculum Vitae',
    openGraph: {
        title: 'Curriculum Vitae |subhodeep',
        description: 'Curriculum Vitae',
        type: 'website',
        images: ogImages('cv'),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Curriculum Vitae | subhodeep',
        description: 'Curriculum Vitae',
        images: ogImages('cv'),
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 