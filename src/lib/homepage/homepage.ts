// src/lib/homepage/homepage.ts
//
// Reads the text of the home page when the site is built (it reads files on
// disk): the introduction from src/content/bio.md and the Socials section from
// src/content/socials.md. src/app/page.tsx hands the result to the page.
import { readContent } from '@/lib/content/content'

/** The introduction: the title, its paragraphs, and the photo below them */
export type Bio = { title: string; paragraphs: string[]; photo: string; photoAlt: string }

/** The introduction at the top of the homepage, from src/content/bio.md */
export function getBio(): Bio {
    const { data, title, paragraphs } = readContent('bio.md')
    return { title, paragraphs, photo: String(data.photo), photoAlt: String(data.photoAlt ?? '') }
}

/** The paragraphs of the Socials section, from src/content/socials.md */
export function getSocials(): string[] {
    return readContent('socials.md').paragraphs
}
