// src/app/older_updates/page.tsx
//
// The Older Updates page at /older_updates: the updates in src/content/updates.md
// that do not fit on the homepage. The homepage shows the newest few (the number
// is set at the top of updates.md), so updates move here by themselves as new
// ones are added. This file reads them when the site is built (it has no
// 'use client', so it never runs in the browser).
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { TerminalNav } from '@/components/ui/terminal-nav/terminal-nav'
import { SectionFooter } from '@/components/layout/footer/SectionFooter'
import { UpdateList } from '@/components/blocks/updates/UpdateList'
import { getOlderUpdates } from '@/lib/updates/updates'

/** The Older Updates page: the title, a line of introduction, and the list. */
export default function OlderUpdates() {
    const updates = getOlderUpdates()

    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                <TerminalNav />

                <div>
                    <TextHeading as="h1" weight="bold" className="mb-2">
                        Older Updates
                    </TextHeading>
                    <Text variant="muted" className="mb-12">
                        Archive of my past updates and activities.
                    </Text>

                    <UpdateList updates={updates} />
                </div>
            </StackVertical>

            <SectionFooter showToTop={false} />
        </BaseContainer>
    )
}
