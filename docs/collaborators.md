# Collaborations page: photos and captions

Every image in `public/collabs/` (`.jpg`, `.jpeg`, `.png`, or `.webp`) appears
on the Collaborations page, at `/research/collaborations`, which is linked from
the Research and About pages. There is no list to maintain; adding or deleting
a file adds or removes the photo.

## How the photos are shown

The photos are shuffled into a new order on every visit, so that no photo
appears to rank above another. File names therefore do not affect the order,
and numbers at the start of a name, such as the 1 in `1srijit.jpg`, are
ignored.

On a laptop or desktop the photos form rows that fill the width, each photo
keeping its shape. On a phone they form two rows, each scrolled sideways on
its own. Clicking a photo enlarges it; the arrow keys, a swipe, or the `‹ ›`
buttons move to the next or previous photo.

## Adding a photo

1. Copy the photo into `public/collabs/`, with a short name in lowercase and
   underscores instead of spaces, such as `anjan_da.jpg`.
2. Shrink it (see [Images](README.md#images)):

   ```sh
   sips -Z 2000 -s formatOptions 80 public/collabs/anjan_da.jpg
   ```

3. Optionally, give it a caption (below).

Without a caption, the file name is used as the description read out by
screen readers, with underscores shown as spaces.

## Captions

Captions are written in `src/app/research/collaborations/_data/captions.ts`,
one line per photo, next to its file name. A caption is shown under the photo
when it is enlarged. A link is written as in Markdown, `[text](address)`:

```ts
export const captions: Record<string, string> = {
    'anjan_da.jpg':
        'With [Anjan da](https://inspirehep.net/authors/989342) playing pool',
    'csgc_gang.jpg': 'With the CSGC gang, IIT Madras',
}
```

- The file name must match the file exactly, including its extension.
- A caption containing an apostrophe is written between double quotation
  marks: `"With the world's best supervisor"`.
- A photo without an entry has no caption.

## Renaming or removing a photo

Renaming a file loses its caption until the name in `captions.ts` is changed
to match. To remove a photo, delete the file, and its line in `captions.ts`.
