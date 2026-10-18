// src/app/blog/_types/blog.ts
//
// The shape of a blog post in the post list: which fields it has and their types.
// TypeScript checks that every post object matches it.

export interface BlogPost {
    id: number // its place in the list of posts, used as a unique key
    title: string // from the frontmatter
    description: string // from the frontmatter
    date: string // from the frontmatter, such as "June 23, 2026"
    readingTime: string // from the frontmatter, such as "5 min read"
    slug: string // the folder name, which is also the address: /blog/<slug>
    draft: boolean // a draft in _drafts/, which only `npm run dev` shows
}
