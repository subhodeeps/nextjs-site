# Next.js for Jekyll users

This site is built with Next.js, React, TypeScript, and Tailwind CSS. If you
know Jekyll and Liquid, you already know most of the ideas; they are just
spelled differently. This note maps one onto the other, and the comments in
the code assume you have read it.

## The big picture

Jekyll reads Markdown and Liquid templates and writes static HTML to `_site/`.
This site does the same: `npm run build` renders every page to static HTML in
`out/`, and Vercel serves those files. The difference is that templates are
TypeScript functions, called components, and a few of them also run in the
visitor's browser to make the page interactive, such as the theme toggle and
the `ls ~` navigation.

## Jekyll terms and their equivalents here

- **Site settings.** `_config.yml` corresponds to `next.config.mjs` (build
  settings) and `tailwind.config.ts` (design settings).
- **Pages.** `about.md`, served at `/about/`, corresponds to
  `src/app/about/page.tsx`, served at `/about`. The folder path is the URL.
  The text of the About page, the homepage, and the CV is kept in Markdown
  files in `src/content/`, which the pages read when the site is built.
- **Layouts.** `_layouts/default.html` corresponds to `src/app/layout.tsx`,
  which wraps every page. A `layout.tsx` inside a folder wraps every page in
  that folder and below it, like a layout that names another as its parent.
- **Front matter.** Keys such as `title:` and `description:` correspond to
  `export const metadata = { ... }` in a `layout.tsx`, which sets the page
  title and the text of link previews.
- **Includes.** `{% include footer.html color="purple" %}` corresponds to a
  component, written `<Footer color="purple" />`, whose parameters are called
  props. Components live in `src/components/`, or in an `_components/` folder
  next to the pages that use them.
- **Data files.** `_data/posts.yml` corresponds to the `_data/*.ts` files,
  which export lists of objects.
- **Posts.** `_posts/2026-06-23-my-first-post.md` corresponds to
  `src/app/blog/_posts/my-first-post/content.mdx`, and a new post starts as a
  copy of `src/app/blog/_posts/_template/`. MDX is Markdown that may also
  contain components. As in Jekyll, a folder whose name starts with an
  underscore is not turned into pages of its own.
- **Assets.** `assets/` corresponds to `public/`, whose files are served
  unchanged: `public/photo.jpg` is available at `/photo.jpg`.
- **Plugins.** Gems in a `Gemfile` correspond to npm packages listed in
  `package.json`, and `npm install` plays the role of `bundle install`.
- **Commands.** `jekyll serve` is `npm run dev`, and `jekyll build` is
  `npm run build`. After editing code, `npm run format` fixes its indentation
  and layout.

## Liquid and JSX side by side

Components return JSX, an HTML-like syntax written inside TypeScript. The
common Liquid tags have direct counterparts:

```liquid
<h1>{{ page.title }}</h1>
{% for post in site.posts %}
  <a href="{{ post.url }}">{{ post.title }}</a>
{% endfor %}
{% if page.draft %}<p>Draft</p>{% endif %}
{% comment %} A note {% endcomment %}
```

```tsx
<h1>{page.title}</h1>
{posts.map((post) => (
  <a key={post.url} href={post.url}>{post.title}</a>
))}
{page.draft && <p>Draft</p>}
{/* A note */}
```

A few rules of JSX:

- Curly braces `{...}` hold a TypeScript expression, like `{{ ... }}`.
- `class` is written `className`, because `class` is a reserved word.
- A list rendered with `.map()` needs a unique `key` on each item.
- `{cond && <p>...</p>}` shows the paragraph only when `cond` is true, and
  `{cond ? a : b}` chooses between two things.
- Comments inside JSX must be written `{/* ... */}`. A `//` comment there is
  not a comment at all; it shows up on the page as text.
- Tags without children close themselves, as in `<Image />`, and `<>...</>`
  groups elements without adding a wrapper element.

## Reading a component

```tsx
// Like an include with one parameter
export function Greeting({ name }: { name: string }) {
  return <p className="text-sm text-muted-foreground">Hello, {name}</p>
}

// Used elsewhere as <Greeting name="Subhodeep" />
```

- `export` makes the function usable in other files, which bring it in with
  `import { Greeting } from "..."`. Imports starting with `@/` refer to
  `src/`, so `@/components/...` is `src/components/...`.
- `{ name }: { name: string }` lists the props and their types. A `?` after a
  name, as in `color?: string`, marks it as optional, and `color = 'purple'`
  gives it a default value.
- An `interface` or `type` block above a component describes its props in one
  place.
- `export default` marks the one main thing a file provides. Next.js uses the
  default export of `page.tsx` and `layout.tsx` as the page and the layout.

## TypeScript in brief

TypeScript is JavaScript with types, written after a colon and checked when
the site is built, as in `const count: number = 3`. `const` declares a value
that is not reassigned, `(x) => x * 2` is a short function, and
`` `Hello ${name}` `` is a string with a value inserted, like
`"Hello {{ name }}"`. `a?.b` reads `b` only if `a` exists, and `a ?? b` means
"`a`, or `b` if `a` is missing".

## Tailwind CSS in brief

Instead of writing CSS rules in a stylesheet, elements list utility classes in
`className`, and each class is one CSS rule:

- `p-4` is `padding: 1rem`, `mt-2` is `margin-top: 0.5rem`, `text-sm` sets a
  small font size, and `flex` lays the children out in a row.
- A prefix applies a class conditionally: `sm:`, `md:`, and `lg:` from a
  screen width upwards (small screens come first), `dark:` in the dark theme,
  and `hover:` under the mouse pointer.
- Square brackets hold an exact value, as in `text-[13px]`, and a slash adds
  transparency, as in `bg-background/80`.
- Colors such as `text-accent` and `bg-background` are the site's own. They
  are defined in `src/app/globals.css` and named in `tailwind.config.ts`.
- `cn(...)` joins several class lists and drops the ones that conflict, so a
  class passed in from outside can override a default.

## Build time and the browser

By default a component runs once, when the site is built, exactly like a
Liquid template. A file that starts with `'use client'` is also sent to the
browser, which is needed for anything that reacts to the visitor: remembering
state with `useState`, running code after the page appears with `useEffect`,
or animating with `framer-motion`.

## Where things live

- `src/app/`: one folder per page, with its `layout.tsx` and `page.tsx`.
- `src/components/`: components shared by several pages.
- `src/lib/`: helper functions.
- `src/styles/`: fonts.
- `public/`: images and files served as they are.

The README describes the common tasks, such as adding a blog post.
