// src/app/blog/_data/posts.ts
//
// The list of blog posts, read from the post folders, like site.posts in Jekyll.
// It runs only when the site is built (it reads files on disk).
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost } from '../_types/blog'

/**
 * Returns every post, newest first. Each post is a folder in
 * src/app/blog/posts/ that contains a content.mdx; the title, description, date
 * and reading time come from the frontmatter (the --- block) at its top, read
 * with the gray-matter package, and the folder name is the slug.
 */
export function getBlogPosts(): BlogPost[] {
    // 1. Point exactly to the posts directory inside src/
    const blogDirectory = path.join(process.cwd(), 'src/app/blog/posts')

    const entries = fs.readdirSync(blogDirectory, { withFileTypes: true })
    const posts: BlogPost[] = []

    // forEach runs the function once for each entry in the folder
    entries.forEach((entry, index) => {
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
                id: index + 1, // Generate ID dynamically
                title: data.title || "Untitled Post",
                description: data.description || "",
                date: data.date || "Unknown Date",
                readingTime: data.readingTime || "5 min read",
                slug: slug // Uses the folder name (e.g., 'rsync-file-transfer')
            })
        }
    })

    // 4. Sort newest to oldest, by turning each date into a number of milliseconds
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
