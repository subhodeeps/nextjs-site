# Homepage updates, the CV, and the Learning page

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

The CV page, `src/app/cv/page.tsx`, has three sections: Employment,
Education, and Skills. Each entry under Employment and Education is one row;
to add an entry, copy a row and change its text and dates:

```tsx
<div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-2">
    <Text>•</Text>
    <Text>Postdoctoral Researcher, Department of Physics, IIT Gandhinagar</Text>
    <Text variant="muted" className="whitespace-nowrap">
        Jun 2026 – Ongoing!
    </Text>
</div>
```

The Skills paragraph is plain text.

The link in "You can find my complete CV here" opens
`public/files/CV_subhodeep.pdf`. To update the PDF, replace that file with the
new version under the same name.

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
