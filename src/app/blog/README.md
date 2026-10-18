# The blog folder

This folder holds the code of the blog. The posts themselves are Markdown
files in `src/content/blog/`, and the drafts in `src/content/drafts/` (see
[docs/blog-posts.md](../../../docs/blog-posts.md)). Folders whose names start
with an underscore hold code, not pages; only `page.tsx` and
`[slug]/page.tsx` produce addresses.

```text
src/app/blog/
├── _components/
│   ├── BlogCard.tsx      # one post's entry in the index
│   ├── BlogHeader.tsx    # navigation, title, and subtitle of the index
│   └── PostMeta.tsx      # the date, reading time, and draft chips
├── _data/
│   └── posts.ts          # reads the list of posts from src/content/blog/
│                         # (and, with npm run dev, src/content/drafts/)
├── _types/
│   └── blog.ts           # the fields of a post
├── [slug]/
│   └── page.tsx          # the layout of every post, at /blog/<slug>
├── layout.tsx            # metadata for /blog
└── page.tsx              # the index at /blog
```
