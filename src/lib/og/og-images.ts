// src/lib/og/og-images.ts
//
// Finds the link-preview image for a page. When a link to the site is shared on
// social media or in a chat app, the preview card shows an image; those images
// all live in public/og/. This code runs only when the site is built (it reads
// the folder on disk), never in a visitor's browser.
import fs from 'fs'
import path from 'path'

// Link-preview (Open Graph / Twitter) images all live in public/og/.
// ogImages("research") uses public/og/research.jpg (or .jpeg/.png/.webp) if it
// exists, then tries any further names given, then public/og/default.*.
// If none of them exist, the page gets no preview image.
const OG_DIR = path.join(process.cwd(), 'public', 'og')
const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']

/**
 * Returns the preview image for a page, as a list of one web path such as
 * ["/og/research.jpg"], or an empty list if there is no image. It is used in the
 * `metadata` of each layout.tsx:
 *
 *     openGraph: { images: ogImages('research') }
 *
 * `...names` lets the caller give several names to try in order, as blog posts
 * do with ogImages(slug, 'blog').
 */
export function ogImages(...names: string[]): string[] {
    for (const name of [...names, 'default']) {
        for (const ext of EXTENSIONS) {
            const file = `${name}.${ext}`
            if (fs.existsSync(path.join(OG_DIR, file))) return [`/og/${file}`]
        }
    }
    return []
}
