// src/app/blog/_components/BlogHeader.tsx
//
// The top of the blog index: the navigation, the title and the subtitle.
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import Text from '@/components/ui/text/text'
import TextHeading from '@/components/ui/text-heading/text-heading'
import { TerminalNav } from '@/components/ui/terminal-nav/terminal-nav'

/** The blog index's header: the navigation, the title and the subtitle. */
export function BlogHeader() {
    return (
        <StackVertical gap="md">
            <TerminalNav />

            {/* Header Content */}
            <div>
                <TextHeading as="h1" weight="bold">
                    Blog
                </TextHeading>
                <Text variant="muted" size="sm">
                    {/* One line of verse set as two, broken at the pause after "code,".
                        The same line is the blog's description in ../layout.tsx. */}
                    on physics, math, and code,
                    <br />
                    and random tangents
                </Text>
            </div>
        </StackVertical>
    )
}
