import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import Text from "@/components/ui/text/text"
import TextHeading from "@/components/ui/text-heading/text-heading"
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"

export function BlogHeader() {
    return (
        <StackVertical gap="md">
            <title>Field Notes on Exploring the Universe | Blog</title>

            {/* Breadcrumb */}
            <div className="flex items-center justify-between">
                <DynamicBreadcrumb 
                    items={[
                        { href: '/', label: 'Home', emoji: '👾' },
                        { label: 'Blog' }
                    ]}
                />
                <ThemeToggle />
            </div>

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
