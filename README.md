# Subhodeep Sarkar's website

This repository contains the source code for my academic website, which
collects my research, CV, blog posts, and notes on reading and learning. The
site is served at [subhodeeps.vercel.app](https://subhodeeps.vercel.app), and
subhodeeps.github.io redirects to it.

If you know Jekyll but not Next.js, start with
[docs/for-jekyll-users.md](docs/for-jekyll-users.md), which maps one onto the
other. Every code file also begins with a comment that explains what it does.
Step-by-step guides for routine changes, such as adding a book, a photograph,
a paper, or a blog post, are listed in [docs/README.md](docs/README.md).

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

## Local development

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

## Deployment

The site is generated as a static export (`output: 'export'` in
`next.config.mjs`). Vercel builds and deploys it from this GitHub repository.

### Daily rebuild

The citation counts on the Research page are fetched from INSPIRE-HEP at build
time, so the site is rebuilt every day to keep them current. The GitHub Actions
workflow `.github/workflows/refresh-citations.yml` runs daily at 08:30 UTC
(2 p.m. in India), after INSPIRE-HEP's daily update, and starts a Vercel build
through a Deploy Hook whose URL is stored as the GitHub secret
`VERCEL_DEPLOY_HOOK`. Step-by-step instructions for setting up the hook and
the secret, testing them, and fixing common problems are in
[`docs/daily-rebuild.md`](docs/daily-rebuild.md).

## Repository structure

```text
.github/workflows/        # the daily rebuild (refresh-citations.yml)
docs/                     # notes for working on the site
scripts/                  # dev-env.sh (setup and local servers), activate,
│                         # and serve-static.mjs
src/
├── app/                  # one directory per section: about, blog, collaborations,
│                         # cv, learning, older_updates, reading, research
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

Git ignores the directories made locally: `.node/` and `.venv/`, the Node.js
and Python environments; `aux/`, for auxiliary files such as the scripts that
draw the plots in posts; `src/content/drafts/` and `public/drafts/`, the
drafts; and `node_modules/`, `.next/`, and `out/`.

## Theme

The light and dark themes use the palettes of my Matplotlib style,
[amore.mplstyle](https://github.com/subhodeeps/amore.mplstyle). The neutrals
come from its slate palette, and the accent is a purple between its plum
palette and the violet of its default color cycle. All 32 colors are defined
once, as CSS variables in `src/app/globals.css`, and are also available as
Tailwind classes such as `text-amore-teal-ink`. Darker tones carry text on the
light theme and lighter tones on the dark theme, while mid tones are kept for
icons, underlines, and other non-text accents. To change the accent, edit
`--accent`, `--accent-muted`, and `--accent-subtle` in both themes.

## Navigation

The top of every page is a shell prompt ending in `ls ~ # tap to run`.
Tapping the command shows its output, the six sections of the site, so every
section can be reached from every page. On the home page the command is plain
`ls` and its output is already shown. The path in the prompt links to each
parent page, like a breadcrumb. The sections, their order, the two pages left
out (Collaborations and Older Updates), and the prompt symbol are set at the
top of `src/components/ui/terminal-nav/terminal-nav.tsx`, where the design is
documented.

## Adding content

This section summarizes where each kind of content is kept; the guides in
[docs/](docs/README.md) describe each change in detail, with examples.

### Blog posts

Each post is a single Markdown file in `src/content/blog/`, and the file name,
without `.md`, determines the URL, `/blog/<slug>`. Every post is laid out in
the same way, from its frontmatter and text, so a post involves no code.

1. Copy `src/content/blog/_template.md` to `src/content/blog/<slug>.md`.
2. Fill in the frontmatter, which also sets the page title and description:

   ```md
   ---
   title: "Post title"
   description: "One-line summary"
   date: "June 23, 2026"
   ---
   ```

   The reading time is estimated from the length of the post, unless the
   frontmatter gives one, as in `readingTime: "5 min read"`.
3. Write the post in Markdown, in place of the sample text. The title is shown
   as its heading, so the text starts with the first paragraph.
4. Optionally, add a link-preview image at `public/og/<slug>.jpg`.

Images for a post go in `public/blog/<slug>/` and are included by file name,
as in `![description](image.png "Caption")`. The image spans the width of the
text, and the caption, if given, appears beneath it.

The blog index lists the posts newest first. Files whose names begin with an
underscore, such as `_template.md`, are left out.

Drafts are kept in `src/content/drafts/` instead, with their images in
`public/drafts/`. Git ignores both, so drafts appear only while the site runs
with `npm run dev`, and never on GitHub or the live site. A draft is published
by moving its file into `src/content/blog/`; the steps are given in
[docs/blog-posts.md](docs/blog-posts.md#drafts).

### Equations

In MDX files, write inline equations as `$...$` and displayed equations as
`$$...$$`. KaTeX renders them at build time.

### Collaborators

Every image in `public/collabs/` (`.jpg`, `.jpeg`, `.png`, or `.webp`) appears
on the Collaborations page. The file name, without its extension, serves as the
alt text, with underscores and hyphens shown as spaces. A photo can be given a
caption in `src/app/collaborations/_data/captions.ts`, with links written as in
Markdown; the caption appears under the enlarged photo and replaces the alt
text.

### Papers

The papers on the Research page are listed in
`src/app/research/_data/papers.ts` by their INSPIRE-HEP record numbers, newest
first, with the thesis listed separately. The title, authors, journal
reference, abstract, BibTeX entry, and citation count of each paper are fetched
from the INSPIRE-HEP API when the site is built, so a new paper needs only its
record number. A paper without a journal reference appears under Preprints and
moves to Published Papers once INSPIRE-HEP records the journal. Web of Science
links cannot be derived from a paper's identifiers, so the Web of Science chip
appears only for entries that give the record's address (`wos`). If INSPIRE-HEP
cannot be reached during a build, the build fails and the deployed site is left
unchanged. The citation counts are kept current by a daily rebuild (see
[Daily rebuild](#daily-rebuild)).

### Reading and Learning

The books on the Reading page are listed in `src/app/reading/_data/books.ts`,
and their covers are in `public/covers/`. An entry needs a title, an author,
and a cover; clicking the cover enlarges it next to the book's details. The
details are optional: the translator, publisher, publication date, page count,
ISBN, blurb, and a link to a review. Most of them can be copied from calibre's
book details. The cards on the Learning page, which link to its subpages, come
from `src/app/learning/_data/posts.ts`.

### Homepage and About page

The introduction at the top of the homepage is written in
`src/content/bio.md`, which also names the photo shown below it, and the
Socials section at the bottom in `src/content/socials.md`. The About page is
written in `src/content/about.md`, which also gives its date, photo, and
caption. All three are plain paragraphs with links written in Markdown.

### Updates

All updates are listed in `src/content/updates.md`, one per line and newest
first, in the form `- DATE | KIND | TEXT`, where the kind selects the icon and
links are written in Markdown. The homepage shows the newest six (a number set
at the top of the file), and the Older Updates page shows the rest, so no entry
has to be moved by hand.

### CV

The CV page is written in `src/content/cv.md`, with a section for each heading
of the form `## Name | Icon` and an entry for each list item of the form
`- text | dates`. It links to `public/files/CV_subhodeep.pdf`; replacing that
file updates the downloadable CV.

### Link previews

Link-preview images, the Open Graph and Twitter cards shown when a page is
shared, are kept in `public/og/`. To give a page its own image, name the file
after its section (`home`, `about`, `blog`, `collaborations`, `cv`, `learning`,
`older_updates`, `reading`, or `research`) or after a blog post's directory,
e.g., `my-first-post.jpg` for `/blog/my-first-post`. JPEG, PNG, and WebP files
are accepted. Pages without their own image use `default.jpg`, and blog posts
try `blog` before falling back to the default. The lookup is implemented in
`src/lib/og/og-images.ts`.

## Acknowledgments

The color palettes come from
[amore.mplstyle](https://github.com/subhodeeps/amore.mplstyle), my Matplotlib
style for research figures. The site is based on the
[sumitdotml/website](https://github.com/sumitdotml/website) template
(© 2025 sumitdotml), which is distributed under the MIT License. A copy of the
license is included in
[licenses/sumitdotml-website.txt](licenses/sumitdotml-website.txt).
