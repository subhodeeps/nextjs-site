# Development and deployment

This guide describes how to run the site on a computer, how it is deployed,
and how the repository is organized.

## Running the site locally

On a new computer running macOS or Linux, `scripts/dev-env.sh` sets up the
site and runs it. It downloads Node.js, at the version given in
`.node-version`, into `.node/` inside the project, in the manner of a Python
virtual environment, so nothing is installed system-wide and no `sudo` is
needed. Besides Git, it requires only `curl` and `tar`, which macOS includes;
on Arch Linux, `sudo pacman -S --needed git curl tar` provides all three.

```bash
scripts/dev-env.sh setup   # Node.js in .node/, then the packages (npm ci)
scripts/dev-env.sh dev     # the development server, at http://localhost:3000
scripts/dev-env.sh serve   # the production build, at http://localhost:4000
scripts/dev-env.sh plots   # .venv/ with amore, for drawing plots for posts
```

The commands `dev`, `build`, and `serve` run the setup first whenever it is
needed, and `PORT=5000` placed before a command changes its port. Sourcing
`scripts/activate` (`. scripts/activate`) makes the project's `node` and `npm`
those of the current shell, until `deactivate`. The usual npm scripts also
work:

```bash
npm run dev     # http://localhost:3000
npm run build   # static export to out/
npm start       # serve out/ at http://localhost:4000
npm run lint    # check the code for likely mistakes
npm run format  # lay out the code consistently (Prettier)
```

The development server keeps a cache in `.next/`, which grows to several
hundred megabytes; it can be deleted whenever the server is stopped, and the
next run recreates it.

## Deployment

The site is generated as a static export (`output: 'export'` in
`next.config.mjs`). Vercel builds and deploys it from this GitHub repository
within a few minutes of each push. Redirects from old addresses, such as
`/collaborations` to `/research/collaborations`, are listed in `vercel.json`,
which Vercel reads; they do not apply to the local servers.

The citation counts on the Research page are fetched from INSPIRE-HEP at build
time, so the site is rebuilt every day to keep them current. The GitHub Actions
workflow `.github/workflows/refresh-citations.yml` runs daily at 08:30 UTC
(2 p.m. in India), after INSPIRE-HEP's daily update, and starts a Vercel build
through a Deploy Hook whose URL is stored as the GitHub secret
`VERCEL_DEPLOY_HOOK`. Setting up the hook and the secret, testing them, and
fixing common problems are described in [daily-rebuild.md](daily-rebuild.md).

## Repository structure

```text
.github/workflows/        # the daily rebuild (refresh-citations.yml)
docs/                     # guides for working on the site
scripts/                  # dev-env.sh (setup and local servers), activate,
│                         # and serve-static.mjs
src/
├── app/                  # one directory per section: about, blog, cv, learning,
│                         # older_updates, reading, research (with collaborations)
├── components/           # page blocks (including the homepage), layout, and UI
├── content/
│   ├── blog/             # the blog posts, one Markdown file each
│   ├── drafts/           # unpublished posts, ignored by Git
│   ├── about.md          # the About page
│   ├── bio.md            # the introduction and photo on the homepage
│   ├── cv.md             # the CV page
│   ├── socials.md        # the Socials section of the homepage
│   └── updates.md        # the updates on the homepage and Older Updates
├── lib/
│   ├── about/            # reads content/about.md for the About page
│   ├── content/          # reads the paragraphs of a file in content/
│   ├── cv/               # reads content/cv.md for the CV page
│   ├── homepage/         # reads content/bio.md and content/socials.md
│   ├── mdx/              # styling for MDX content
│   ├── og/               # link-preview image lookup
│   ├── updates/          # reads content/updates.md
│   └── utils/            # the cn() helper for combining class names
├── styles/               # fonts and background patterns
└── mdx-components.tsx    # connects the MDX styling to Next.js
public/
├── blog/                 # images for blog posts, one directory per post
├── collabs/              # photos for the Collaborations page
├── covers/               # book covers for the Reading page
├── files/                # CV PDFs
└── og/                   # link-preview images
```

Every code file begins with a comment that explains what it does.

Git ignores the directories made locally: `.node/` and `.venv/`, the Node.js
and Python environments; `aux/`, for auxiliary files such as the scripts that
draw the plots in posts; `src/content/drafts/` and `public/drafts/`, the
drafts; and `node_modules/`, `.next/`, and `out/`.
