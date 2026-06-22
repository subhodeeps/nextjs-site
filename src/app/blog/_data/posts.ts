// import { BlogPost } from "../_types/blog"

// export const blogPosts: BlogPost[] = [
    
//     {
//         id: 1,
//         title: "Dummy Post",
//         description: "A comprehensive guide on getting started with machine learning, from math to practical implementation.",
//         date: "December 25, 2024",
//         readingTime: "10 min read",
//         slug: "getting-started-with-machine-learning"
//     }
// ] 

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost } from '../_types/blog' // Adjust this path if  types file is located elsewhere

export function getBlogPosts(): BlogPost[] {
    // 1. Point exactly to  posts directory inside src/
    const blogDirectory = path.join(process.cwd(), 'src/app/blog/posts')
    
    const entries = fs.readdirSync(blogDirectory, { withFileTypes: true })
    const posts: BlogPost[] = []

    entries.forEach((entry, index) => {
        // 2. ONLY look inside directories (skips your layout.tsx, page.tsx, and images at the root of /posts)
        if (!entry.isDirectory()) return
        
        // Skip any hidden folders or folders starting with '_'
        if (entry.name.startsWith('.') || entry.name.startsWith('_')) return

        const slug = entry.name
        const mdxPath = path.join(blogDirectory, slug, 'content.mdx')

        // 3. If the folder has a content.mdx, extract the Frontmatter
        if (fs.existsSync(mdxPath)) {
            const fileContent = fs.readFileSync(mdxPath, 'utf-8')
            const { data } = matter(fileContent)

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

    // 4. Add older React-only posts manually since they don't have an MDX file to read from
    const legacyPosts: BlogPost[] = [
        {
            id: 999, // Just needs to be unique
            title: "Getting Started with Machine Learning",
            description: "A comprehensive guide on getting started with machine learning, from math to practical implementation.",
            date: "December 25, 2024",
            readingTime: "10 min read",
            slug: "getting-started-with-machine-learning"
        }
    ]

    // 5. Combine and sort newest to oldest
    const allPosts = [...posts, ...legacyPosts]
    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}