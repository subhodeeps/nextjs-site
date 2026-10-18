# Blog posts

Each post is a single Markdown file in `src/content/blog/`, and the file's
name, without `.md`, becomes the post's address; `first-author-culture.md`, for
example, is served at `/blog/first-author-culture`. The layout of the page,
with the navigation, the date, the title, and the footer, is the same for every
post and is drawn from the file, so a post involves no code. The blog index
lists the posts newest first.

How-to posts and reference notes belong on the notes site,
<https://quasinormal-notes.vercel.app/>, not on the blog.

## Writing a post

1. Copy `src/content/blog/_template.md` and rename the copy, using lowercase
   words joined by hyphens, such as `my-new-post.md`.
2. Fill in the block at the top, called the frontmatter:

   ```md
   ---
   title: "Post title"
   description: "One-line summary, shown on the blog index and in previews"
   date: "October 18, 2026"
   ---
   ```

   The title is shown as the post's heading, so the text that follows starts
   with the first paragraph. The date may also be written as `2026-10-18`, as
   in Jekyll. The reading time is estimated from the length of the post, at
   about 200 words a minute; a line such as `readingTime: "5 min read"` in the
   frontmatter replaces the estimate.
3. Replace the sample text with the post, written in Markdown.
4. Preview the post at `http://localhost:3000/blog/my-new-post`. If the
   development server does not show a new post, restart it (see
   [Previewing and publishing](README.md#previewing-and-publishing-a-change)).

## Drafts

A post that is not ready to be published is kept as a draft in
`src/content/drafts/`, written in the same way as a post. While the site runs
with `npm run dev`, drafts appear on the blog index, marked as drafts, and at
their addresses, such as `/blog/my-new-post`. The production build,
`npm run build`, which Vercel runs, leaves them out.

Git ignores everything in `src/content/drafts/` except its README, and the
drafts' images in `public/drafts/`, so drafts are never committed. They
therefore appear neither on the live site nor on GitHub, where the repository
is public. For the same reason, Git does not back them up; they exist only on
the computer on which they were written.

To publish a draft, move its file into `src/content/blog/` and its images, if
any, into `public/blog/`:

```sh
mv src/content/drafts/my-new-post.md src/content/blog/
mv public/drafts/my-new-post public/blog/
```

The post is then committed and pushed like any other change.

## Writing in Markdown

Posts are plain Markdown, so `{` and `<` need no escaping.

- **Links**: `[text](https://...)`. Links to other sites open in a new tab.
- **Mathematics**: `$e^{i\pi} + 1 = 0$` inline, and a `$$ ... $$` block for a
  displayed equation, as in LaTeX.
- **Quotations**: start the lines with `>`.
- **A horizontal rule**: a line with `---` and blank lines around it.
- **Code**: a fenced code block, with the language after the opening fence.
- **Notes to oneself**: text between `<!--` and `-->` is not shown.

## Images

Put a post's images in `public/blog/<name>/`, where `<name>` is the name of the
post's file without `.md` (for a draft, in `public/drafts/<name>/`), and
include them by file name:

```md
![What the image shows](figure.png "Caption")
```

The text in square brackets describes the image for screen readers. The
caption, in quotation marks, is optional; it appears under the image and may
contain links written as `[text](address)`. A full path, such as
`/covers/book.jpg`, or the address of an image on another site, also works.
Shrink large images first (see [Images](README.md#images)).

## Link previews

When a post is shared on social media or in a chat, the preview shows the
image `public/og/<name>.jpg` if it exists, or else the site's default image,
`public/og/default.jpg`.
