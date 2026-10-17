// src/components/ui/text-heading/section-heading.tsx
//
// The heading of a section within a page, such as "Marginalia" on the Reading
// page or "Published Papers" on the Research page, used as
// <SectionHeading icon={BookOpen}>Currently Reading</SectionHeading>. Every
// section heading on the site has this one look, the size and weight of the card
// titles on the Learning page, with an optional small icon from lucide-react
// before it; to change them all, change the classes below.
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils/utils'
import TextHeading from './text-heading'

// The size (the same as an h4: 14px on phones, growing to 18px on large screens)
const size = 'text-sm sm:text-base md:text-base lg:text-lg'
// The space above and below
const spacing = 'mb-2 mt-4'

/**
 * A section heading.
 *
 * @param icon      a lucide-react icon shown before the heading, in the faint accent colour
 * @param as        the heading level, for the page's outline and screen readers
 *                  (default 'h2'); it does not change the look
 * @param className extra Tailwind classes, which win over the defaults
 */
export default function SectionHeading({
    children,
    icon: Icon,
    as = 'h2',
    className,
}: {
    children: React.ReactNode
    icon?: LucideIcon
    as?: 'h2' | 'h3'
    className?: string
}) {
    if (!Icon) {
        return (
            <TextHeading as={as} weight="medium" className={cn(size, spacing, className)}>
                {children}
            </TextHeading>
        )
    }
    return (
        <div className={cn('flex items-center gap-2', spacing, className)}>
            <Icon aria-hidden className="h-4 w-4 shrink-0 text-accent-muted" />
            <TextHeading as={as} weight="medium" className={cn(size, 'my-0')}>
                {children}
            </TextHeading>
        </div>
    )
}
