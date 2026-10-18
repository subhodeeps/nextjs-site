# Blog posts

Each post is a folder in `src/app/blog/_posts/`, and the folder's name becomes
the post's address; the folder `first-author-culture`, for example, is served
at `/blog/first-author-culture`. The blog index lists the posts newest first.

How-to posts and reference notes belong on the notes site,
<https://quasinormal-notes.vercel.app/>, not on the blog.

## Writing a post

1. Copy the folder `src/app/blog/_posts/_template/` and rename the copy, using
   lowercase words joined by hyphens, such as `my-new-post`.
2. In `content.mdx`, fill in the block at the top, called the frontmatter:

   ```mdx
   ---
   title: "Post title"
   description: "One-line summary, shown on the blog index and in previews"
   date: "October 18, 2026"
   readingTime: "3 min read"
   ---
   ```

   Then replace the sample text with the post, written in Markdown, starting
   with the title as a `#` heading. A reading time of about one minute per
   200 words is usual.
3. In `page.tsx`, change the date line to match the frontmatter:

   ```tsx
   October 18, 2026 | 3 min read
   ```

4. Preview the post at `http://localhost:3000/blog/my-new-post`. If the
   development server shows an error for a new post, restart it (see
   [Previewing and publishing](README.md#previewing-and-publishing-a-change)).

## Drafts

A post that is not ready to be published can be kept as a draft in
`src/app/blog/_drafts/`. A draft is made in the same way as a post, by copying
`src/app/blog/_posts/_template/` into `_drafts/` and renaming the copy. While
the site runs with `npm run dev`, drafts appear on the blog index, marked as
drafts, and at their addresses, such as `/blog/my-new-post`. The production
build, `npm run build`, which Vercel runs, leaves them out.

Git ignores everything in `_drafts/` except its README, so drafts are never
committed. They therefore appear neither on the live site nor on GitHub, where
the repository is public. For the same reason, Git does not back them up; they
exist only on the computer on which they were written.

Images for a draft go in `public/blog/_drafts/<post-folder>/`, which Git also
ignores, and are included as `/blog/_drafts/<post-folder>/figure.png`.

To publish a draft, move its folder into `_posts/` and its images into
`public/blog/<post-folder>/`, and remove `_drafts/` from the image paths in
`content.mdx`:

```sh
mv src/app/blog/_drafts/my-new-post src/app/blog/_posts/
mv public/blog/_drafts/my-new-post public/blog/
```

The post is then committed and pushed like any other change.

## Writing in MDX

MDX is Markdown that can also contain code, so in ordinary text `{` must be
written as `\{` and `<` as `\<`.

- **Links**: `[text](https://...)`. Links to other sites open in a new tab.
- **Mathematics**: `$e^{i\pi} + 1 = 0$` inline, and a `$$ ... $$` block for a
  displayed equation, as in LaTeX.
- **Quotations**: start the lines with `>`.
- **A horizontal rule**: a line with `---` and blank lines around it.
- **Code**: a fenced code block, with the language after the opening fence.

## Images

Put images in `public/blog/<post-folder>/` and include them with

```mdx
![What the image shows](/blog/my-new-post/figure.png "Caption")
```

The text in square brackets describes the image for screen readers. The
caption, in quotation marks, is optional; it appears under the image and may
contain links written as `[text](address)`. Shrink large images first (see
[Images](README.md#images)).

## Link previews

When a post is shared on social media or in a chat, the preview shows the
image `public/og/<post-folder>.jpg` if it exists, or else the site's default
image, `public/og/default.jpg`.
