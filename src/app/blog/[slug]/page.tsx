// src/app/blog/[slug]/page.tsx
//
// The address readers use for a post: /blog/my-first-post, for example.
// The [slug] folder name is a placeholder, like :title in a Jekyll permalink: one
// file serves every post, and `slug` is the part of the address in its place.
// Because the site is static, every post's page is built in advance; the list of
// slugs comes from generateStaticParams below.
//
// Each post is one Markdown file, src/content/blog/<slug>.md (a draft,
// src/content/drafts/<slug>.md), and this file lays out every post in the same
// way, like a Jekyll layout: the navigation, the date and reading time, the title
// from the frontmatter, the text, and the footer.
import { notFound } from 'next/navigation'
import type { ComponentProps, ReactNode } from 'react'
import { getBlogPosts } from '../_data/posts'
import { PostMeta } from '../_components/PostMeta'
import { ogImages } from '@/lib/og/og-images'
import { mdxComponents } from '@/lib/mdx/mdx-components'
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import { TerminalNav } from '@/components/ui/terminal-nav/terminal-nav'
import { IndividualPageFooter } from '@/components/layout/footer/IndividualPageFooter'
import { cn } from '@/lib/utils/utils'
import { monoFont } from '@/styles/fonts/fonts'

// The title and the images of a post are drawn as in the text of every post
const PostTitle = mdxComponents.h1 as (props: ComponentProps<'h1'>) => ReactNode
const PostImage = mdxComponents.img as (props: ComponentProps<'img'>) => ReactNode

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
 * frontmatter of its Markdown file, and its link-preview image.
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
        description: post.description,
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
 * The post's page. The text is compiled from the post's Markdown file when the
 * site is built, so no script holding it is sent to the browser. An unknown slug
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

    // The post's Markdown file, as a component that draws its text. The test of
    // NODE_ENV comes first because `npm run build` replaces it with false, so the
    // build leaves the drafts out altogether.
    const { default: Content } =
        process.env.NODE_ENV === 'development' && post.draft
            ? await import(`../../../content/drafts/${slug}.md`)
            : await import(`../../../content/blog/${slug}.md`)

    // An image written by file name alone, ![...](photo.jpg), is in the post's own
    // folder in public/: public/blog/<slug>/, or, for a draft, public/drafts/<slug>/
    const folder = `/${post.draft ? 'drafts' : 'blog'}/${slug}/`
    const components = {
        ...mdxComponents,
        img: ({ src, ...rest }: ComponentProps<'img'>) => (
            <PostImage
                {...rest}
                src={typeof src === 'string' && !/^(\/|[a-z]+:)/i.test(src) ? folder + src : src}
            />
        ),
    }

    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                <TerminalNav />

                <article id="article-content">
                    <PostMeta
                        date={post.date}
                        readingTime={post.readingTime}
                        draft={post.draft}
                        className="mb-8"
                    />

                    {/* The title, then the text; mdxComponents decides how each part looks */}
                    <div className={cn('max-w-none', monoFont.className)}>
                        <PostTitle>{post.title}</PostTitle>
                        <Content components={components} />
                    </div>
                </article>
            </StackVertical>

            <IndividualPageFooter sectionName="Blog" showToTop={true} />
        </BaseContainer>
    )
}
