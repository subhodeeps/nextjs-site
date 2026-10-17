// src/app/learning/articles/page.tsx
//
// The page at /learning/articles: a list of essays and articles, written in
// content.mdx next to this file. Edit content.mdx to change the list.
'use client'

import Content from './content.mdx'
import { listPageComponents } from '@/lib/mdx/list-page-components'
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import { TerminalNav } from '@/components/ui/terminal-nav/terminal-nav'
import { IndividualPageFooter } from '@/components/layout/footer/IndividualPageFooter'

/** Draws content.mdx in the style of the Marginalia page, between the navigation and the footer. */
export default function LearningArticles() {
    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                <TerminalNav />
                {/* The text of content.mdx, drawn like the Marginalia page (see list-page-components.tsx) */}
                <div>
                    <Content components={listPageComponents} />
                </div>
            </StackVertical>

            <IndividualPageFooter parentPageName="Learning" showToTop={true} />
        </BaseContainer>
    )
}
