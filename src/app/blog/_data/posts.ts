// src/app/blog/_data/posts.ts
//
// The list of blog posts, read from the post folders, like site.posts in Jekyll.
// It runs only when the site is built (it reads files on disk). Drafts, in
// _drafts/, are listed only while the site runs with `npm run dev`, like
// `jekyll serve --drafts`.
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost } from '../_types/blog'

/**
 * Returns every post, newest first. Each post is a folder in
 * src/app/blog/_posts/ that contains a content.mdx; the title, description, date
 * and reading time come from the frontmatter (the --- block) at its top, read
 * with the gray-matter package, and the folder name is the slug. With
 * `npm run dev`, the folders in src/app/blog/_drafts/ are listed too, marked as
 * drafts; `npm run build`, which Vercel runs, leaves them out.
 */
export function getBlogPosts(): BlogPost[] {
    const folders = process.env.NODE_ENV === 'development' ? ['_posts', '_drafts'] : ['_posts']
    const posts: BlogPost[] = []

    for (const folder of folders) {
        // 1. Point exactly to the folder inside src/
        const blogDirectory = path.join(process.cwd(), 'src/app/blog', folder)
        if (!fs.existsSync(blogDirectory)) continue

        const entries = fs.readdirSync(blogDirectory, { withFileTypes: true })

        // forEach runs the function once for each entry in the folder
        entries.forEach((entry) => {
            // 2. Only look inside directories, skipping any files next to them
            if (!entry.isDirectory()) return

            // Skip any hidden folders or folders starting with '_'
            if (entry.name.startsWith('.') || entry.name.startsWith('_')) return

            const slug = entry.name
            const mdxPath = path.join(blogDirectory, slug, 'content.mdx')

            // 3. If the folder has a content.mdx, extract the frontmatter
            if (fs.existsSync(mdxPath)) {
                const fileContent = fs.readFileSync(mdxPath, 'utf-8')
                const { data } = matter(fileContent)

                // `a || b` uses the default b when the frontmatter has no value for a
                posts.push({
                    id: posts.length + 1, // Its place in the list, as a unique key
                    title: data.title || 'Untitled Post',
                    description: data.description || '',
                    date: data.date || 'Unknown Date',
                    readingTime: data.readingTime || '5 min read',
                    slug: slug, // Uses the folder name (e.g., 'my-first-post')
                    draft: folder === '_drafts',
                })
            }
        })
    }

    // 4. Sort newest to oldest, by turning each date into a number of milliseconds
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
