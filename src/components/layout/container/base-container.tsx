// src/components/layout/container/base-container.tsx
//
// The centred column that holds each page's content. Almost every page starts
// with <BaseContainer size="md" paddingX="md" paddingY="lg"> ... </BaseContainer>.
import { cn } from '@/lib/utils/utils'

// The props (parameters) this component accepts. A `?` marks a prop as optional,
// and 'sm' | 'md' | ... means only those exact values are allowed.
interface BaseContainerProps {
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    paddingX?: 'none' | 'sm' | 'md' | 'lg'
    paddingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    center?: boolean
    className?: string
}

// Maximum width of the column for each size: max-w-3xl is 48rem (768px)
const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-3xl',
    lg: 'max-w-4xl',
    xl: 'max-w-5xl',
    full: 'max-w-full',
}

// Space on the left and right, growing with the screen (sm:, md: apply from those widths up)
const paddingX = {
    none: 'px-0',
    sm: 'px-2 sm:px-3 md:px-4',
    md: 'px-3 sm:px-4 md:px-6',
    lg: 'px-4 sm:px-6 md:px-8',
}

// Space above and below
const paddingY = {
    none: 'py-0',
    sm: 'py-2 sm:py-3 md:py-4',
    md: 'py-3 sm:py-4 md:py-6',
    lg: 'py-4 sm:py-6 md:py-8',
    xl: 'py-6 sm:py-8 md:py-12',
}

/**
 * A centred column of limited width, like a page wrapper <div> in a Jekyll layout.
 *
 * @param size      how wide the column may get (default 'md', 768px)
 * @param paddingX  space at the sides (default 'md')
 * @param paddingY  space above and below (default 'md')
 * @param center    centre the text as well
 * @param className extra Tailwind classes, which win over the defaults
 */
export default function BaseContainer({
    children,
    size = 'md',
    // `paddingX: px` takes the prop called paddingX and names it px inside the
    // function, because the name paddingX is already used by the table above
    paddingX: px = 'md',
    paddingY: py = 'md',
    center = false,
    className,
}: BaseContainerProps) {
    return (
        <div
            className={cn(
                'mx-auto w-full',
                sizes[size],
                paddingX[px],
                paddingY[py],
                center && 'text-center',
                className,
            )}
        >
            {children}
        </div>
    )
}
