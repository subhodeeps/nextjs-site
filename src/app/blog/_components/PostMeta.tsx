// src/app/blog/_components/PostMeta.tsx
//
// A post's date and reading time, and the mark of a draft, as small chips in the
// style of inline code: on the blog index, and at the top of each post.
import { cn } from '@/lib/utils/utils'
import { codeFont } from '@/styles/fonts/code'

// The shape and font of inline code in posts (src/lib/mdx/mdx-components.tsx)
const chip = cn(
    codeFont.className,
    'px-1.5 py-0.5 rounded-md text-[10px] sm:text-xs leading-normal',
)

/**
 * The chips: the date and reading time in grey, and "draft", for a draft, in the
 * accent colour of inline code.
 */
export function PostMeta({
    date,
    readingTime,
    draft,
    className,
}: {
    date: string
    readingTime: string
    draft?: boolean
    className?: string
}) {
    return (
        <div className={cn('flex flex-wrap items-center gap-2', className)}>
            <span className={cn(chip, 'bg-muted text-muted-foreground')}>{date}</span>
            <span className={cn(chip, 'bg-muted text-muted-foreground')}>{readingTime}</span>
            {draft && <span className={cn(chip, 'bg-accent-subtle text-accent')}>draft</span>}
        </div>
    )
}
