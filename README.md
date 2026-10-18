# Subhodeep Sarkar's website

This repository contains the source code for my academic website, which
collects my research, CV, blog posts, and notes on reading and learning. The
site is served at [subhodeeps.vercel.app](https://subhodeeps.vercel.app), and
subhodeeps.github.io redirects to it. Vercel builds it from this repository as
a static export, and rebuilds it daily to refresh the citation counts on the
Research page.

## Running it

On macOS or Linux, with Git, `curl`, and `tar` installed:

```bash
scripts/dev-env.sh setup   # Node.js in .node/, then the packages
scripts/dev-env.sh dev     # the development server, at http://localhost:3000
```

Nothing is installed system-wide. The other commands, the npm scripts, and
deployment are described in [docs/development.md](docs/development.md).

## Documentation

The guides in [docs/](docs/README.md) describe each routine change, such as
adding a book, a photograph, a paper, a blog post, or an update, with the file
to edit and an example to copy. Readers who know Jekyll but not Next.js can
start with [docs/for-jekyll-users.md](docs/for-jekyll-users.md), which maps one
onto the other. Every code file also begins with a comment that explains what
it does.

## Software

- [Next.js 16](https://nextjs.org) (App Router, bundled with webpack),
  React 19, and TypeScript
- Tailwind CSS 3 for styling
- JetBrains Mono for text, Source Code Pro for code, Fira Code for headings,
  and Anek Bangla for Bengali
- Markdown and MDX for long-form pages, with KaTeX for equations,
  prism-react-renderer for syntax highlighting, and Mermaid for diagrams
- framer-motion for animation and next-themes for the light and dark modes
- lucide-react and react-icons for icons
- Vercel Analytics and Speed Insights for traffic and performance metrics

## Acknowledgments

The color palettes come from
[amore.mplstyle](https://github.com/subhodeeps/amore.mplstyle), my Matplotlib
style for research figures. The site is based on the
[sumitdotml/website](https://github.com/sumitdotml/website) template
(© 2025 sumitdotml), which is distributed under the MIT License. A copy of the
license is included in
[licenses/sumitdotml-website.txt](licenses/sumitdotml-website.txt).
