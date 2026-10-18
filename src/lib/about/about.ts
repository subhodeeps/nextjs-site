// src/lib/about/about.ts
//
// Reads the About page from src/content/about.md when the site is built (it
// reads a file on disk): the title, the date, the photo with its caption, and
// the paragraphs, which src/app/about/page.tsx draws.
import { readContent } from '@/lib/content/content'

export type About = {
    title: string
    date: string
    photo: string
    photoAlt: string
    caption: string
    titleCredit: string // where the title comes from, shown small at the end
    paragraphs: string[] // may contain links written as [text](address)
}

/** The About page, from src/content/about.md */
export function getAbout(): About {
    const { data, title, paragraphs } = readContent('about.md')
    return {
        title,
        date: String(data.date ?? ''),
        photo: String(data.photo),
        photoAlt: String(data.photoAlt ?? ''),
        caption: String(data.caption ?? ''),
        titleCredit: String(data.titleCredit ?? ''),
        paragraphs,
    }
}
