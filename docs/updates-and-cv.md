# The homepage, the About page, the CV, and the Learning page

## The homepage introduction

The text at the top of the homepage is written in `src/content/bio.md`:

```md
---
photo: /pretty.jpg
photoAlt: 'A shrub with flowers inside the Jamia campus.'
---

# subhodeep's homepage

Hey, how are you! I am [Subhodeep](/about).

I am a postdoctoral researcher at IIT ~~Madras~~ Gandhinagar, India.
```

- The line starting with a single `#` is the title.
- Each paragraph is separated from the next by a blank line. A paragraph may
  span several lines, which are joined when the page is built. The paragraphs
  fade in one after another and are spaced apart on the page.
- Links are written as `[text](address)` and shown in bold in the accent
  color. Text written as `~~text~~` is struck through.
- `photo` is the image below the introduction, a file in `public/`, and
  `photoAlt` is its description for screen readers.

## The Socials section

The Socials section at the bottom of the homepage is written in
`src/content/socials.md`. The first paragraph, with the email address, is shown
in the body color. Any later paragraph is shown in smaller gray type, with its
links underlined by dots, which suits short asides such as the line linking to
the notes site and the hobby site:

```md
Elsewhere: my [technical notes](https://quasinormal-notes.vercel.app/) and a
[site for my hobbies](https://hobby-site.vercel.app/books/).
```

## The About page

The About page is written in `src/content/about.md`, in the same way as the
homepage introduction:

```md
---
date: 'January 29, 2025'
photo: /photo.jpg
photoAlt: 'Profile photo'
caption: 'Bengaluru, Jun 2026.'
titleCredit: 'The title is borrowed from [Ami Amar Mone](https://...).'
---

# আমি, আমার মন - ছোট্ট সংগঠন

Hey! I'm Subhodeep, a postdoctoral researcher at the Indian Institute of
Technology Gandhinagar.
```

- The line starting with a single `#` is the title, which is also used in the
  browser tab and in link previews, and `date` is shown under it.
- `photo` is the picture beside the text, a file in `public/`; `photoAlt` is
  its description for screen readers, and `caption` the line under it.
- `titleCredit` is a small, faint line at the end of the page saying where the
  title comes from. It may be left out.
- Paragraphs are separated by blank lines, and links are written as
  `[text](address)`.

## Updates

All updates are kept in one file, `src/content/updates.md`, one per line and
newest first. The homepage shows the newest six, and the Older Updates page
shows the rest, so an update moves to the archive by itself once six newer
ones have been added. The number is set at the top of the file
(`homepage: 6`).

### Adding an update

Add a line at the top of the list, in the form `- DATE | KIND | TEXT`:

```md
- 05 Mar 2025 | talk | Talk at CMI.
- 29 May 2026 | preprint | [The Vaidya QNM preprint is out!](https://...)
- 11 Mar 2026 | talk | Talk at [FRoG 26](https://...), IISER Mohali.
```

- **DATE** is written as it should appear, such as `01 Jun 2026`, or
  `07–09 Mar 2025` for a range. It is shown in square brackets.
- **KIND** chooses the icon, as listed below. It can be left out, as in
  `- 05 Mar 2025 | Talk at CMI.`, and the line then has a small dot.
- **TEXT** is the update itself, with links written as `[text](address)`. An
  update that is entirely one link, such as the second line above, is shown in
  the accent color, date included; otherwise the text is gray, with any links
  in it in the accent color.

| Kind       | Icon               | For                                |
| ---------- | ------------------ | ---------------------------------- |
| `job`      | briefcase          | new positions                      |
| `preprint` | page of text       | preprints                          |
| `paper`    | open book          | published papers                   |
| `notes`    | open book          | lecture notes                      |
| `talk`     | presentation board | talks                              |
| `video`    | video camera       | talks with a recording             |
| `event`    | apple              | workshops, schools, and meetings   |
| `degree`   | brain              | degrees and defenses               |

A new kind with its own icon is added in
`src/components/blocks/updates/UpdateList.tsx`, in the list named `icons`,
using an icon from <https://lucide.dev/icons>, whose name must also be added
to the `lucide-react` import at the top of that file.

## The CV

The CV page is written in `src/content/cv.md`:

```md
# Curriculum Vitae

A summary of my academic and professional journey.

You can find my complete CV [here](/files/CV_subhodeep.pdf).

## Employment | Briefcase

- Postdoctoral Researcher, IIT Gandhinagar | Jun 2026 – Ongoing!

## Skills | Code

python, jupyter, vulpix, ...
```

- The first paragraph after the title is shown in gray as the introduction;
  later paragraphs are shown in the body color.
- Each section starts with `## Name | Icon`. The icon is the name of an icon on
  <https://lucide.dev/icons>, written as it appears there in the code examples
  (e.g., `GraduationCap` or `Trophy`), and may be left out. A new section, such
  as `## Awards | Trophy`, needs no other change.
- Each list item, a line starting with a hyphen, is an entry, with its dates
  after a vertical bar, shown on the right. Other lines in a section form a
  paragraph, as under Skills.
- Links are written as `[text](address)`. Links to other sites and to PDF files
  open in a new tab.

To update the full CV, replace `public/files/CV_subhodeep.pdf` with the new
version under the same name.

## The Learning page

### The cards

The cards on the Learning page are defined in
`src/app/learning/_data/posts.ts`. Each card links to a subpage or to another
site:

```ts
{
    id: 3,
    title: 'Card title',
    description: 'One or two sentences about what the page holds.',
    lastUpdated: 'October 18, 2026',
    href: '/learning/refs',
    icon: Atom,
},
```

- `id` must differ from the numbers of the other cards.
- An `href` that starts with `http` opens in a new tab.
- `icon` is optional. It is an icon from <https://lucide.dev/icons>, whose
  name must also be added to the `lucide-react` import at the top of the file.

### Physics References, and Essays and Articles Worth Reading

These two pages are written in Markdown, in
`src/app/learning/refs/content.mdx` and
`src/app/learning/articles/content.mdx`, and are drawn in the style of the
Marginalia page. Each has a title, a one-paragraph introduction, and a
bulleted list:

```md
# Essays and Articles Worth Reading

Some essays and articles that I have enjoyed reading.

- [Title of the piece](https://...) Author, where it appeared (year).
```

When either page changes, update the date on its card in `posts.ts`.
