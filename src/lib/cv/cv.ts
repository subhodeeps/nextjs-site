// src/lib/cv/cv.ts
//
// Reads the CV from src/content/cv.md when the site is built (it reads a file on
// disk) and turns it into the parts that src/app/cv/page.tsx draws: the title,
// the paragraphs of introduction, and the sections with their entries.
import fs from 'fs'
import path from 'path'

/** One entry: the text, and the dates shown on the right, if any */
export type CvEntry = { text: string; dates?: string }

/** A section: its name, the lucide icon named after it, its entries and paragraphs */
export type CvSection = {
    name: string
    icon?: string
    entries: CvEntry[]
    paragraphs: string[]
}

export type Cv = { title: string; intro: string[]; sections: CvSection[] }

/**
 * Reads src/content/cv.md. Lines are taken one at a time: "# " is the title,
 * "## Name | Icon" starts a section, "- text | dates" is an entry, a blank line
 * ends a paragraph, and any other line is part of a paragraph, either of the
 * introduction (before the first section) or of the current section.
 */
export function getCv(): Cv {
    const file = fs.readFileSync(path.join(process.cwd(), 'src/content/cv.md'), 'utf-8')
    // The <!-- ... --> comment with the instructions is left out
    const lines = file.replace(/<!--[\s\S]*?-->/g, '').split('\n')

    const cv: Cv = { title: '', intro: [], sections: [] }
    let paragraph: string[] = []
    const current = () => cv.sections[cv.sections.length - 1]

    // Adds the lines collected so far as one paragraph, to the current section or
    // to the introduction
    const endParagraph = () => {
        if (paragraph.length === 0) return
        const text = paragraph.join(' ')
        if (current()) current().paragraphs.push(text)
        else cv.intro.push(text)
        paragraph = []
    }

    for (const raw of lines) {
        const line = raw.trim()
        if (line.startsWith('## ')) {
            endParagraph()
            const [name, icon] = line.slice(3).split(' | ')
            cv.sections.push({ name: name.trim(), icon: icon?.trim(), entries: [], paragraphs: [] })
        } else if (line.startsWith('# ')) {
            endParagraph()
            cv.title = line.slice(2).trim()
        } else if (line.startsWith('- ') && current()) {
            endParagraph()
            const [text, ...dates] = line.slice(2).split(' | ')
            current().entries.push({
                text: text.trim(),
                dates: dates.join(' | ').trim() || undefined,
            })
        } else if (line === '') {
            endParagraph()
        } else {
            paragraph.push(line)
        }
    }
    endParagraph()
    return cv
}
