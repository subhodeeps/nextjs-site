// src/app/blog/page.tsx
//
// The blog index at /blog: every post, newest first. The list comes from
// getBlogPosts() in ./_data/posts.ts, which reads each post's frontmatter, so a
// new post folder appears here without any change to this file. Folders whose
// names start with _ (here _components, _data, _types) are not pages; Next.js
// ignores them when it builds the site's addresses.
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import { BlogCard } from './_components/BlogCard'
import { BlogHeader } from './_components/BlogHeader'
import { getBlogPosts } from './_data/posts'
import { SectionFooter } from '@/components/layout/footer/SectionFooter'
import { Metadata } from 'next'

// This page's own metadata, which takes priority over blog/layout.tsx
export const metadata: Metadata = {
    title: 'Blog | subhodeep',
    description: 'thoughts on stuff',
}

/** The blog index: the header, then one BlogCard per post, then the footer. */
export default function BlogListing() {
    // Read the list of posts; this runs once, when the site is built
    const blogPosts = getBlogPosts()

    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                <BlogHeader />
                <StackVertical gap="none">
                    {/* The {% for post in posts %} loop; the last card gets no line below it */}
                    {blogPosts.map((post, index) => (
                        <BlogCard
                            key={post.id}
                            post={post}
                            isLast={index === blogPosts.length - 1}
                        />
                    ))}
                </StackVertical>
            </StackVertical>
            <SectionFooter showToTop={false} />
        </BaseContainer>
    )
}
