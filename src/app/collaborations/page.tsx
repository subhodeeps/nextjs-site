// src/app/collaborations/page.tsx
//
// The Collaborations page at /collaborations: a short text and a grid of photos.
// The photos are every image in public/collabs/. This file reads that folder when
// the site is built (it has no 'use client', so it never runs in the browser) and
// hands the list to grid.tsx, which shuffles it in the visitor's browser, so the
// order changes on every visit. To add a photo, put it in public/collabs/; to give
// it a caption, add an entry to ./_data/captions.ts.
import fs from 'fs'
import path from 'path'
import sizeOf from 'image-size'

import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import TextHeading from '@/components/ui/text-heading/text-heading'
import { SectionFooter } from '@/components/layout/footer/SectionFooter'
import Text from '@/components/ui/text/text'
import { TerminalNav } from '@/components/ui/terminal-nav/terminal-nav'

// Import the new client component
import CollaboratorGrid from './grid'
import { captions } from './_data/captions'

// One photo: its address, the alt text made from its file name, its size in
// pixels (the image component needs the size to reserve space for it) and its
// caption from ./_data/captions.ts, if it has one
type CollaboratorPhoto = {
    id: string
    name: string
    photoUrl: string
    width: number
    height: number
    caption?: string
}

/** The Collaborations page; it collects the photos, then draws the text and the grid. */
export default function Collaborators() {
    const photosDirectory = path.join(process.cwd(), 'public', 'collabs')
    // `let` (unlike `const`) allows the value to be replaced, as it is below
    let people: CollaboratorPhoto[] = []

    // try/catch: if reading the folder fails, log the error and show no photos,
    // instead of failing the whole build
    try {
        const files = fs.readdirSync(photosDirectory)

        // Read the files statically at build time (no shuffling here). Keep only image
        // files, then turn each file name into a photo entry.
        people = files
            .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
            .map((file, index) => {
                const filepath = path.join(photosDirectory, file)
                const imageBuffer = fs.readFileSync(filepath)
                const dimensions = sizeOf(imageBuffer)

                // "anjan_da.jpg" becomes the alt text "anjan da"; `?? 1200` is the size to
                // use if the image size cannot be read
                const nameWithoutExt = file.replace(/\.[^/.]+$/, '')

                return {
                    id: String(index),
                    name: nameWithoutExt.replace(/[_-]/g, ' '),
                    photoUrl: `/collabs/${file}`,
                    width: dimensions.width ?? 1200,
                    height: dimensions.height ?? 1200,
                    caption: captions[file],
                }
            })
    } catch (error) {
        console.error('Failed to read collabs directory:', error)
    }

    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                <TerminalNav />

                {/* Header */}
                <div>
                    <TextHeading as="h1" weight="bold">
                        Collaborations (for lack of a better word)
                    </TextHeading>

                    <Text variant="faint" size="smaller" className="mb-10">
                        Research is rarely a solitary endeavor. I have been incredibly fortunate to
                        collaborate and regularly interact with many amazing individuals whose
                        insight, work ethic, generosity, and enthusiasm for physics have profoundly
                        influenced my own approach to research. This page contains photographs of
                        some of the people with whom I have worked, from whom I have learned, and
                        with whom I have exchanged ideas. It is necessarily incomplete, and I hope
                        it remains that way for as long as I'm in the business.
                    </Text>

                    {/* Pass the static data into the Client Component to handle the random shuffle */}
                    <CollaboratorGrid initialPeople={people} />
                </div>
            </StackVertical>

            <SectionFooter showToTop={false} />
        </BaseContainer>
    )
}
