# Website for my blog

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
npm run lint
```

## Deployment

The site is a static export (`output: 'export'` in `next.config.mjs`). Vercel builds and deploys it from this GitHub repo.

## Link previews

Preview images for shared links live in `public/og/`. Name an image after a section (`home`, `about`, `blog`, `collaborations`, `cv`, `learning`, `older_updates`, `reading`, `research`) or after a blog post's folder (e.g. `rsync-file-transfer`), as `.jpg`, `.jpeg`, `.png` or `.webp`. Pages without their own image use `default.jpg`; blog posts try `blog` first. The lookup is in `src/lib/og/og-images.ts`.

## TODO

- [ ] add metadata tags to individual sections (currently only the blog page has it)
- [ ] add the learnings page with the books subdirectory with mdx (later)

## References

Tools used: React, Next.js, Tailwind, TypeScript.

The breadcrumb in [src/components/ui/primitives](src/components/ui/primitives) is from [shadcn/ui](https://ui.shadcn.com/docs/components/breadcrumb).
