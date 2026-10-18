# Drafts

Each Markdown file here is a blog post that is not ready yet, written like a
post in `../blog/`, for example as a copy of `../blog/_template.md`. Drafts
appear on the blog, marked as drafts, only while the site runs with
`npm run dev`; `npm run build`, which Vercel runs, leaves them out. Git ignores
everything here except this file, and likewise the drafts' images in
`public/drafts/`, so drafts are never committed: they stay off GitHub as well
as off the site, and exist only on this computer.

To publish a draft, move its file into `src/content/blog/` and its images, if
any, from `public/drafts/<name>/` to `public/blog/<name>/`. See
[docs/blog-posts.md](../../../docs/blog-posts.md).
