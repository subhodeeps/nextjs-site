# Reading page: books and their details

The books under Currently Reading are listed in
`src/app/reading/_data/books.ts`, in the order they appear. Their covers are
in `public/covers/`. Clicking a cover enlarges it next to the book's details.

## Adding a book

1. Save the cover as a JPEG in `public/covers/`, with a short name in lowercase
   such as `pinker.jpg`, and shrink it (see [Images](README.md#images)):

   ```sh
   sips -Z 1600 -s formatOptions 80 public/covers/pinker.jpg
   ```

2. Add an entry to the list in `books.ts`. Only the title, author, and cover
   are needed; everything else is optional and is shown only when given:

   ```ts
   {
       title: 'Figuring',
       author: 'Maria Popova',
       cover: '/covers/popova.jpg',
   },
   ```

   Text between quotation marks may not contain the same mark, so a title with
   an apostrophe is written between double quotation marks:
   `title: "The Sense of Style: The Thinking Person's Guide",`.

3. Preview the Reading page and click the new cover.

## The details

A complete entry looks like this:

```ts
{
    title: 'In a Flight of Starlings: The Wonders of Complex Systems',
    author: 'Giorgio Parisi',
    cover: '/covers/parisi.jpg',
    translator: 'Simon Carnell',
    publisher: 'Penguin Press',
    published: 'July 2023',
    pages: 144,
    isbn: '9780593493151',
    blurb: `The first paragraph of the description.

        The second paragraph.`,
    reviews: [
        { source: 'Kirkus', url: 'https://www.kirkusreviews.com/...' },
        { source: 'Sayani Sarkar', url: 'https://...' },
    ],
    openLibrary: 'https://openlibrary.org/books/OL39783986M',
    review: 'https://example.com/my-review',
},
```

- **title.** A subtitle, after a colon and a space, is shown on a line of its
  own.
- **published.** Written as it should appear, such as `2019` or `March 2019`.
- **pages.** A number, without quotation marks.
- **isbn.** The ISBN-13 of the edition whose cover is shown.
- **blurb.** Written between backticks, as above, so that it can run over
  several lines and contain both kinds of quotation marks. A blank line starts
  a new paragraph; the indentation of the lines does not matter.
- **reviews.** Reviews in newspapers, magazines, or blogs. Each has the name
  shown on the page (`source`) and the address (`url`). They are shown in the
  order given, separated by dots.
- **openLibrary.** The book's page on Open Library, shown as "Catalog".
- **review.** The address of your own review, shown as "Read my review".

## Finding the details

The details should describe the edition whose cover is shown, since the
publisher, date, page count, and ISBN differ between editions. The edition can
usually be identified from the cover, by the publisher's logo, the design, or
the quotations printed on it.

- **The publisher's page** for the edition is the most reliable source of the
  ISBN, page count, publication date, and blurb. Penguin's books are at
  penguin.co.uk and penguinrandomhouse.com; searching those sites for the ISBN
  finds the right page.
- **calibre** fetches most of these details, including the blurb, if the book
  is in your calibre library, but not the translator.
- **Open Library.** The address `https://openlibrary.org/isbn/` followed by the
  ISBN opens the edition's page, if Open Library lists that edition. Otherwise,
  search <https://openlibrary.org> for the title and use the book's main page.

For the blurb, leave out the advertising lines that publishers put at the top,
such as "THE SUNDAY TIMES BESTSELLER" or quotations from reviews.

## Removing a book

Delete its entry from `books.ts`. Its cover can stay in `public/covers/` or be
deleted.

## Marginalia

The Marginalia page, `src/app/reading/marginalia/page.tsx`, lists short pieces
of writing worth keeping. Each piece is one `<li>` in its list; copy one and
change the link and text to add a piece.
