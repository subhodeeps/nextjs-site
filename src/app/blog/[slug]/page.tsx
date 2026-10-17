// src/app/blog/[slug]/page.tsx
//
// The address readers use for a post: /blog/my-first-post, for example.
// The [slug] folder name is a placeholder, like :title in a Jekyll permalink: one
// file serves every post, and `slug` is the part of the address in its place.
// Because the site is static, every post's page is built in advance; the list of
// slugs comes from generateStaticParams below.
//
// The post itself lives in src/app/blog/_posts/<slug>/ (content.mdx for the text,
// page.tsx for how it is laid out). The _ in _posts keeps Next.js from turning
// that folder into pages of its own, so each post has exactly one address.
import { notFound } from 'next/navigation'
import { getBlogPosts } from '../_data/posts'
import { ogImages } from '@/lib/og/og-images'

// What Next.js passes in: the slug, which has to be waited for with `await`
type Params = Promise<{ slug: string }>

/**
 * Lists every post's slug, so Next.js builds one page per post, as Jekyll writes
 * one file per post. (`async` marks a function that can wait for things.)
 */
export async function generateStaticParams() {
    const blogPosts = getBlogPosts()

    // A static export refuses an empty list, so while there are no posts, a single
    // placeholder is built instead, which shows the 404 page. Its slug starts with
    // _, which no post's can (getBlogPosts skips such folders).
    if (blogPosts.length === 0) return [{ slug: '_none' }]

    return blogPosts.map((post) => ({
        slug: post.slug,
    }))
}

/**
 * The metadata of one post's page: its title and description, taken from the
 * frontmatter of its content.mdx, and its link-preview image.
 */
export async function generateMetadata({ params }: { params: Params }) {
    // Take `slug` out of the params; `const { slug } = ...` is shorthand for that
    const { slug } = await params
    const blogPosts = getBlogPosts()

    // Find the post once for efficiency
    const post = blogPosts.find((p) => p.slug === slug)

    // If it doesn't exist, return empty metadata
    if (!post) return {}

    return {
        title: `${post.title} | subhodeep`,
        openGraph: {
            title: `${post.title} | subhodeep`,
            description: post.description,
            images: ogImages(slug, 'blog'),
        },
        twitter: {
            card: 'summary_large_image',
            title: `${post.title} | subhodeep`,
            description: post.description,
            images: ogImages(slug, 'blog'),
        },
    }
}

/**
 * The post's page: finds the post and draws its own page.tsx. An unknown slug
 * gives the 404 page.
 */
export default async function BlogPost({ params }: { params: Params }) {
    const { slug } = await params
    const blogPosts = getBlogPosts()

    // Find the matching blog post
    const post = blogPosts.find((post) => post.slug === slug)

    // If no matching post is found, return 404
    if (!post) {
        notFound()
    }

    // Load src/app/blog/_posts/<slug>/page.tsx and draw it. `.default` is that
    // file's main export, the post's page component.
    const PostComponent = (await import(`../_posts/${slug}/page`)).default
    return <PostComponent />
}
