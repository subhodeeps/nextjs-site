// src/lib/homepage/homepage.ts
//
// Reads the text of the home page when the site is built (it reads files on
// disk): the introduction from src/content/bio.md and the Socials section from
// src/content/socials.md. src/app/page.tsx hands the result to the page.
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/** The introduction: the title, its paragraphs, and the photo below them */
export type Bio = { title: string; paragraphs: string[]; photo: string; photoAlt: string }

/**
 * Reads a file in src/content: the settings between the --- lines, the title
 * (a line starting with "# "), and the paragraphs, which are separated by blank
 * lines. The lines of a paragraph are joined with spaces, and the <!-- ... -->
 * comment with the instructions is left out.
 */
function readContent(name: string) {
    const file = fs.readFileSync(path.join(process.cwd(), 'src/content', name), 'utf-8')
    const { data, content } = matter(file)

    let title = ''
    const paragraphs: string[] = []
    let paragraph: string[] = []
    const endParagraph = () => {
        if (paragraph.length > 0) paragraphs.push(paragraph.join(' '))
        paragraph = []
    }

    for (const raw of content.replace(/<!--[\s\S]*?-->/g, '').split('\n')) {
        const line = raw.trim()
        if (line.startsWith('# ')) {
            endParagraph()
            title = line.slice(2).trim()
        } else if (line === '') {
            endParagraph()
        } else {
            paragraph.push(line)
        }
    }
    endParagraph()
    return { data, title, paragraphs }
}

/** The introduction at the top of the homepage, from src/content/bio.md */
export function getBio(): Bio {
    const { data, title, paragraphs } = readContent('bio.md')
    return { title, paragraphs, photo: String(data.photo), photoAlt: String(data.photoAlt ?? '') }
}

/** The paragraphs of the Socials section, from src/content/socials.md */
export function getSocials(): string[] {
    return readContent('socials.md').paragraphs
}
