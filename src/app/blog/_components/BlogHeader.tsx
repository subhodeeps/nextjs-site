import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import Text from "@/components/ui/text/text"
import TextHeading from "@/components/ui/text-heading/text-heading"
import { TerminalNav } from "@/components/ui/terminal-nav/terminal-nav"

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
