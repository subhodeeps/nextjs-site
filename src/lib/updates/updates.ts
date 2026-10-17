// src/lib/updates/updates.ts
//
// Reads the updates from src/content/updates.md and splits them between the
// homepage and the Older Updates page. It runs only when the site is built (it
// reads a file on disk), and the pages hand the result to the components that
// draw the lists (src/components/blocks/updates/UpdateList.tsx).
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/** One update: the date as written, the kind (which chooses the icon) and the text */
export type Update = {
    date: string
    kind: string
    text: string // may contain links written as [text](address)
}

/** Reads every update, newest first, and the number the homepage shows */
function readUpdates(): { updates: Update[]; homepage: number } {
    const file = fs.readFileSync(path.join(process.cwd(), 'src/content/updates.md'), 'utf-8')
    // gray-matter separates the settings between the --- lines from the list;
    // the <!-- ... --> comment with the instructions is removed before the list
    // is read, so that its example line is not taken for an update
    const { data, content } = matter(file)
    const updates = content
        .replace(/<!--[\s\S]*?-->/g, '')
        .split('\n')
        .filter((line) => /^\s*-\s+/.test(line))
        .map((line) => {
            // "- 01 Jun 2026 | job | Joined IIT GN as a postdoc." has three parts;
            // a line without a kind ("- 01 Jun 2026 | Talk at CMI.") has two
            const parts = line.replace(/^\s*-\s+/, '').split(' | ')
            const [date, kind, ...rest] = parts.length >= 3 ? parts : [parts[0], '', parts[1]]
            return { date: date.trim(), kind: kind.trim(), text: rest.join(' | ').trim() }
        })
    return { updates, homepage: Number(data.homepage) || 6 }
}

/** The newest updates, for the homepage, and whether there are older ones */
export function getHomepageUpdates(): { updates: Update[]; hasOlder: boolean } {
    const { updates, homepage } = readUpdates()
    return { updates: updates.slice(0, homepage), hasOlder: updates.length > homepage }
}

/** The updates that do not fit on the homepage, for the Older Updates page */
export function getOlderUpdates(): Update[] {
    const { updates, homepage } = readUpdates()
    return updates.slice(homepage)
}
