# Guides for updating the site

Each guide explains one kind of change, with the file to edit and an example
to copy.

- [Reading page: books and their details](reading.md)
- [Collaborations page: photos and captions](collaborators.md)
- [Research page: papers, preprints, and the thesis](papers.md)
- [Blog posts](blog-posts.md)
- [The homepage, the About page, the CV, and the Learning page](updates-and-cv.md)
- [The daily rebuild that refreshes citation counts](daily-rebuild.md)
- [Theme, navigation, and link previews](design.md)
- [Development and deployment](development.md): running the site locally,
  publishing it, and the layout of the repository
- [Next.js for Jekyll users](for-jekyll-users.md), which explains how the
  code is organized

## Previewing and publishing a change

1. Start the site on your computer with `scripts/dev-env.sh dev`, which also
   sets it up on a new computer (see
   [Development and deployment](development.md#running-the-site-locally)), or
   with `npm run dev`, and open <http://localhost:3000>. Pages update as you
   save files. If a new post does not show up, stop the server (Ctrl+C), run
   `rm -rf .next/dev`, and start it again.
2. Format the code with `npm run format`.
3. Optionally, check that the whole site builds, and look at the result, with
   `scripts/dev-env.sh serve`, which serves the production build at
   <http://localhost:4000>. A build made with `npm run build` instead changes
   `next-env.d.ts`; undo that with `git checkout -- next-env.d.ts`.
4. Commit and push:

   ```sh
   git add -A
   git commit -m "Describe the change"
   git push
   ```

   Vercel rebuilds and publishes the site within a few minutes of the push.

## Images

Photographs taken with a phone or camera are typically several megabytes in
size, which slows the pages down. A JPEG can be reduced in place with `sips`,
which is included with macOS; its arguments are the length of the longest side,
in pixels, and the JPEG quality:

```sh
sips -Z 1600 -s formatOptions 80 public/covers/new-book.jpg
```

A length of 1600 pixels suits book covers, and 2000 suits photographs. A PNG
can be converted to a JPEG at the same time:

```sh
sips -Z 2000 -s format jpeg -s formatOptions 80 photo.png --out photo.jpg
```
