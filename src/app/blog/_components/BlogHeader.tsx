// src/app/blog/_components/BlogHeader.tsx
//
// The top of the blog index: the navigation, the title and the subtitle.
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import Text from "@/components/ui/text/text"
import TextHeading from "@/components/ui/text-heading/text-heading"
import { TerminalNav } from "@/components/ui/terminal-nav/terminal-nav"

/**
 * The blog index's header.
 *
 * The <title> below is moved into <head> by React. The page's metadata adds a
 * second <title> after it ("Blog | subhodeep"), and browsers use the first one,
 * so this is the title shown in the browser tab.
 */
export function BlogHeader() {
    return (
        <StackVertical gap="md">
            <title>Field Notes on Exploring the Universe | Blog</title>

            <TerminalNav />

            {/* Header Content */}
            <div>
                <TextHeading as="h1" weight="bold">
                   Field Notes on Exploring the Universe | Blog
                </TextHeading>
                <Text variant="muted" size="sm">
                    physics • maths • coding • ideas • opinions • rants
                </Text>
            </div>
        </StackVertical>
    )
}
