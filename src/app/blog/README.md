# The blog folder

Folders whose names start with an underscore hold code and posts, not pages;
only `page.tsx` and `[slug]/page.tsx` produce addresses.

```text
src/app/blog/
├── _components/
│   ├── BlogCard.tsx      # one post's entry in the index
│   └── BlogHeader.tsx    # navigation, title, and subtitle of the index
├── _data/
│   └── posts.ts          # reads the list of posts from _posts/ (and, with
│                         # npm run dev, from _drafts/)
├── _drafts/              # drafts, shown only by npm run dev; ignored by Git
├── _posts/
│   ├── _template/        # copy this folder to start a new post
│   └── <slug>/           # one folder per post
│       ├── content.mdx   # the text, with its frontmatter
│       ├── page.tsx      # how the post is laid out
│       └── section-ids.ts
├── _types/
│   └── blog.ts           # the fields of a post
├── [slug]/
│   └── page.tsx          # serves each post at /blog/<slug>
├── layout.tsx            # metadata for /blog
└── page.tsx              # the index at /blog
```
