import { Metadata } from 'next'
import { ogImages } from '@/lib/og/og-images'

export const metadata: Metadata = {
    title: 'Transfer Files from Ubuntu to Arch Linux over SSH/SFTP | subhodeeps.github.io',
    description: 'A short guide to securely transferring files between Ubuntu and Arch Linux using rsync and SSH.',
    openGraph: {
        title: 'Transfer Files from Ubuntu to Arch Linux over SSH/SFTP | subhodeeps.github.io',
        description: 'A short guide to securely transferring files between Ubuntu and Arch Linux using rsync and SSH.',
        type: 'article',
        publishedTime: '2026-06-23T00:00:00.000Z',
        images: ogImages('rsync-file-transfer', 'blog'),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Transfer Files from Ubuntu to Arch Linux over SSH/SFTP',
        description: 'A short guide to securely transferring files between Ubuntu and Arch Linux using rsync and SSH.',
        images: ogImages('rsync-file-transfer', 'blog'),
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}