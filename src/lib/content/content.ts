// src/lib/content/content.ts
//
// Reads a Markdown file in src/content when the site is built (it reads a file on
// disk), for the pages whose text is plain paragraphs: the homepage introduction
// and socials (src/lib/homepage/homepage.ts) and the About page
// (src/lib/about/about.ts).
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * Reads a file in src/content: the settings between the --- lines, the title
 * (a line starting with "# "), and the paragraphs, which are separated by blank
 * lines. The lines of a paragraph are joined with spaces, and the <!-- ... -->
 * comment with the instructions is left out.
 */
export function readContent(name: string) {
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
