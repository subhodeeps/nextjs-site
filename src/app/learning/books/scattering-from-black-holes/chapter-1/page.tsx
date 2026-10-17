// src/app/learning/books/scattering-from-black-holes/chapter-1/page.tsx
//
// The page at /learning/books/scattering-from-black-holes/chapter-1: the notes on
// chapter 1, written in notes.mdx next to this file.
'use client'

import Notes from './notes.mdx'
import { mdxComponents } from '@/lib/mdx/mdx-components'
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import { TerminalNav } from '@/components/ui/terminal-nav/terminal-nav'
import { IndividualPageFooter } from '@/components/layout/footer/IndividualPageFooter'

/** Draws notes.mdx with the site's Markdown styles, between the navigation and the footer. */
export default function Chapter1() {
    return (
        <>
            <BaseContainer size="md" paddingX="md" paddingY="lg">
                <StackVertical gap="md">
                    <TerminalNav />

                    {/* The text of notes.mdx; mdxComponents decides how each Markdown element looks */}
                    <div>
                        <Notes components={mdxComponents} />
                    </div>
                </StackVertical>
            </BaseContainer>

            <IndividualPageFooter parentPageName="BH Scattering Book" showToTop={false} />
        </>
    )
}
