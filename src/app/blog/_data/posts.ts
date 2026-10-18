// src/app/blog/_data/posts.ts
//
// The list of blog posts, like site.posts in Jekyll: one Markdown file per post
// in src/content/blog/, whose name, without .md, is the post's address. It runs
// only when the site is built (it reads files on disk). Drafts, in
// src/content/drafts/, are listed only while the site runs with `npm run dev`,
// like `jekyll serve --drafts`.
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost } from '../_types/blog'

/**
 * Returns every post, newest first. The title, description and date come from
 * the frontmatter (the --- block) at the top of each file, read with the
 * gray-matter package. The reading time is worked out from the length of the
 * text, at about 200 words a minute, unless the frontmatter gives one. With
 * `npm run dev`, the drafts are listed too, marked as drafts; `npm run build`,
 * which Vercel runs, leaves them out.
 */
export function getBlogPosts(): BlogPost[] {
    const folders = process.env.NODE_ENV === 'development' ? ['blog', 'drafts'] : ['blog']
    const posts: BlogPost[] = []

    for (const folder of folders) {
        const directory = path.join(process.cwd(), 'src/content', folder)
        if (!fs.existsSync(directory)) continue

        for (const file of fs.readdirSync(directory)) {
            // Only Markdown files, leaving out _template.md and the README
            if (!file.endsWith('.md') || file.startsWith('_') || file === 'README.md') continue

            const { data, content } = matter(fs.readFileSync(path.join(directory, file), 'utf-8'))
            const words = content.split(/\s+/).filter(Boolean).length

            posts.push({
                id: posts.length + 1, // Its place in the list, as a unique key
                title: data.title || 'Untitled Post',
                description: data.description || '',
                date: formatDate(data.date),
                readingTime: data.readingTime || `${Math.max(1, Math.round(words / 200))} min read`,
                slug: file.replace(/\.md$/, ''), // The file name, as in my-new-post.md
                draft: folder === 'drafts',
            })
        }
    }

    // Sort newest to oldest, by turning each date into a number of milliseconds
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * The date as shown on the site. It may be written as "October 18, 2026", or, as
 * in Jekyll, as 2026-10-18, which the frontmatter reader turns into a date.
 */
function formatDate(date: unknown): string {
    if (date instanceof Date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
        })
    }
    return typeof date === 'string' && date ? date : 'Unknown Date'
}
