// src/components/blocks/homepage/Homepage.tsx
//
// The whole home page, put together from its sections. src/app/page.tsx shows
// it at /. Its text is written in src/content: bio.md (the intro and photo),
// updates.md, and socials.md.
'use client'

import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import { HomepageFooter } from '@/components/layout/footer/HomepageFooter'
import { HeroSection } from '@/components/blocks/homepage/HeroSection'
import { CurrentWork } from '@/components/blocks/homepage/CurrentWork'
import { TerminalNav } from '@/components/ui/terminal-nav/terminal-nav'
import { HomepageSocials } from '@/components/blocks/homepage/HomepageSocials'
import type { Update } from '@/lib/updates/updates'
import type { Bio } from '@/lib/homepage/homepage'

/**
 * The home page: the navigation prompt, then the intro, the updates and the
 * socials, then the footer. <>...</> groups elements without adding a wrapper.
 *
 * @param bio      the introduction and photo, from src/app/page.tsx
 * @param updates  the newest updates
 * @param hasOlder whether there are more, on the Older Updates page
 * @param socials  the paragraphs of the Socials section
 */
export function Homepage({
    bio,
    updates,
    hasOlder,
    socials,
}: {
    bio: Bio
    updates: Update[]
    hasOlder: boolean
    socials: string[]
}) {
    return (
        <>
            <BaseContainer size="md" paddingX="md" paddingY="lg">
                <TerminalNav className="mb-8" />
                <StackVertical gap="lg">
                    <HeroSection bio={bio} />
                    <CurrentWork updates={updates} hasOlder={hasOlder} />
                    <HomepageSocials paragraphs={socials} />
                </StackVertical>
            </BaseContainer>
            <HomepageFooter />
        </>
    )
}
