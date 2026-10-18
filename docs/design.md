# Theme, navigation, and link previews

This guide describes the parts of the design shared by every page: the colors,
the navigation at the top, and the images shown when a page is shared.

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

Text sizes are defined in `src/components/ui/text/text.tsx`. Text under a
section heading, such as the updates on the homepage, uses the size `section`,
which is kept well below that of the heading.

## Navigation

The top of every page is a shell prompt ending in `ls ~ # tap to run`.
Tapping the command shows its output, the six sections of the site, so every
section can be reached from every page. On the homepage the command is plain
`ls`, and its output is already shown. The path in the prompt links to each
parent page, like a breadcrumb, so a page in a subdirectory, such as
`~/research/collaborations` or `~/reading/marginalia`, leads back to its
section. The path follows the page's address, so a page becomes a subdirectory
of a section by moving its folder inside that section's folder in `src/app/`.

The sections, their order, the page left out of the listing (Older Updates,
which is linked from the homepage), and the prompt symbol are set at the top of
`src/components/ui/terminal-nav/terminal-nav.tsx`, where the design is
documented.

## Link previews

Link-preview images, the Open Graph and Twitter cards shown when a page is
shared, are kept in `public/og/`. To give a page its own image, name the file
after its section (`home`, `about`, `blog`, `collaborations`, `cv`, `learning`,
`older_updates`, `reading`, or `research`) or after a blog post's file, e.g.,
`my-first-post.jpg` for `/blog/my-first-post`. JPEG, PNG, and WebP files are
accepted. Pages without their own image use `default.jpg`, and blog posts try
`blog` before falling back to the default. The lookup is implemented in
`src/lib/og/og-images.ts`.
