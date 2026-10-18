# Drafts

Each folder here is a blog post that is not ready yet, made like a post in
`_posts/`, by copying `_posts/_template/`. Drafts appear on the blog, marked
as drafts, only while the site runs with `npm run dev`; `npm run build`, which
Vercel runs, leaves them out. Git ignores everything here except this file, so
drafts are never committed: they stay off GitHub as well as off the site, and
exist only on this computer.

To publish a draft, move its folder into `_posts/`, and its images, if any,
from `public/blog/_drafts/<folder>/` to `public/blog/<folder>/`. See
[docs/blog-posts.md](../../../../docs/blog-posts.md).
