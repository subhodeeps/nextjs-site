// src/app/blog/posts/set-up-python/layout.tsx
//
// Metadata for /blog/posts/set-up-python, the counterpart of Jekyll front matter. Note that this
// address is not the one readers use: the blog links to /blog/set-up-python, which is
// drawn by src/app/blog/[slug]/page.tsx and takes its title and description
// from the frontmatter of content.mdx. This file only matters if someone opens
// /blog/posts/set-up-python directly.
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
        images: ogImages('set-up-python', 'blog'),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Transfer Files from Ubuntu to Arch Linux over SSH/SFTP',
        description: 'A short guide to securely transferring files between Ubuntu and Arch Linux using rsync and SSH.',
        images: ogImages('set-up-python', 'blog'),
    }
}

/** Shows the page unchanged; this layout exists only for its metadata. */
export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
