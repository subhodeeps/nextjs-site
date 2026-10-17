# Subhodeep Sarkar's website

This repository contains the source code for my academic website, which
collects my research, CV, blog posts, and notes on reading and learning. The
site is served at [subhodeeps.vercel.app](https://subhodeeps.vercel.app), and
subhodeeps.github.io redirects to it.

## Software

- [Next.js 16](https://nextjs.org) (App Router, bundled with webpack),
  React 19, and TypeScript
- Tailwind CSS 3 for styling
- MDX for long-form pages, with KaTeX for equations and prism-react-renderer
  for syntax highlighting
- framer-motion for animation and next-themes for the light and dark modes
- lucide-react and react-icons for icons
- Vercel Analytics and Speed Insights for traffic and performance metrics

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
npm run lint
```

To preview the production build, serve the `out/` directory with a static file
server, e.g., `npx serve@latest out`.

## Deployment

The site is generated as a static export (`output: 'export'` in
`next.config.mjs`). Vercel builds and deploys it from this GitHub repository.

## Repository structure

```text
src/
├── app/                  # one directory per section: about, blog, collaborations,
│                         # cv, learning, older_updates, reading, research
├── components/           # page blocks (including the homepage), layout, and UI
├── lib/
│   ├── mdx/              # styling for MDX content
│   └── og/               # link-preview image lookup
├── styles/               # fonts and background patterns
└── mdx-components.tsx    # connects the MDX styling to Next.js
public/
├── collabs/              # photos for the Collaborations page
├── covers/               # book covers for the Reading page
├── files/                # CV PDFs
└── og/                   # link-preview images
```

## Adding content

### Blog posts

1. Create the directory `src/app/blog/posts/<slug>/`. The directory name
   determines the URL, `/blog/<slug>`.
2. Write the post in `content.mdx`, beginning with the following frontmatter:

   ```mdx
   ---
   title: "Post title"
   description: "One-line summary"
   date: "June 23, 2026"
   readingTime: "5 min read"
   ---
   ```

3. Copy `page.tsx`, `layout.tsx`, and `section-ids.ts` from an existing post,
   such as `rsync-file-transfer`. Then update the date line in `page.tsx` and
   the title and description in `layout.tsx`.
4. Optionally, add a link-preview image at `public/og/<slug>.jpg`.

The blog index lists every post directory that contains a `content.mdx` file,
newest first.

### Equations

In MDX files, write inline equations as `$...$` and displayed equations as
`$$...$$`. KaTeX renders them at build time.

### Collaborators

Every image in `public/collabs/` (`.jpg`, `.jpeg`, `.png`, or `.webp`) appears
on the Collaborations page. The file name, without its extension, serves as the
alt text, with underscores and hyphens shown as spaces.

### Reading and Learning

The book list on the Reading page is defined in `src/app/reading/page.tsx`, and
the cover images are in `public/covers/`. On both the Reading and Learning
pages, the cards that link to subpages come from the section's
`_data/posts.ts`.

### CV

The CV page links to `public/files/CV_subhodeep.pdf`. Replacing that file
updates the downloadable CV.

### Link previews

Link-preview images, the Open Graph and Twitter cards shown when a page is
shared, are kept in `public/og/`. To give a page its own image, name the file
after its section (`home`, `about`, `blog`, `collaborations`, `cv`, `learning`,
`older_updates`, `reading`, or `research`) or after a blog post's directory,
e.g., `rsync-file-transfer.jpg`. JPEG, PNG, and WebP files are accepted. Pages
without their own image use `default.jpg`, and blog posts try `blog` before
falling back to the default. The lookup is implemented in
`src/lib/og/og-images.ts`.

## Acknowledgments

The site is based on the
[sumitdotml/website](https://github.com/sumitdotml/website) template
(© 2025 sumitdotml), which is distributed under the MIT License. A copy of the
license is included in
[licenses/sumitdotml-website.txt](licenses/sumitdotml-website.txt). The
breadcrumb component is adapted from
[shadcn/ui](https://ui.shadcn.com/docs/components/breadcrumb).
