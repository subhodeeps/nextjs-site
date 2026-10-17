// src/components/layout/layout-stack/layout-stack.tsx
//
// Helpers that place their children in a column, a row or a grid, with even
// spacing between them, so that pages do not repeat the same spacing classes.
import { cn } from '@/lib/utils/utils'



interface FlexStackProps {
    children: React.ReactNode;
    className?: string;
    gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

// Vertical space between stacked children, larger from the sm: width up
const gaps = {
    none: '',
    xs: 'space-y-0.5 sm:space-y-1',
    sm: 'space-y-1 sm:space-y-2',
    md: 'space-y-2 sm:space-y-4',
    lg: 'space-y-4 sm:space-y-8',
    xl: 'space-y-6 sm:space-y-12'
}

/**
 * Puts its children one below the other, with `gap` space between them
 * (default 'md'). Used on most pages to space out the sections.
 */
export function StackVertical({ children, className, gap = 'md' }: FlexStackProps) {
    return (
        <div className={cn('flex flex-col', gaps[gap], className)}>
            {children}
        </div>
    );
}

/**
 * Puts its children side by side, vertically centred, with `gap` space between
 * them. The chain of `a ? b : c ? d : ...` picks the classes for the chosen gap,
 * like an if / elsif / else.
 */
export function StackHorizontal({ children, className, gap = 'md' }: FlexStackProps) {
    return (
        <div className={cn('flex flex-row items-center',
            gap === 'none' ? '' :
            gap === 'xs' ? 'gap-0.5 sm:gap-1' :
            gap === 'sm' ? 'gap-1 sm:gap-2' :
            gap === 'md' ? 'gap-2 sm:gap-4' :
            gap === 'lg' ? 'gap-4 sm:gap-8' :
            'gap-6 sm:gap-12',
            className
        )}>
            {children}
        </div>
    );
}

// `extends` adds to FlexStackProps: a grid takes the same props plus `cols`
interface GridLayoutProps extends FlexStackProps {
    cols?: 1 | 2 | 3 | 4;
}

/**
 * A grid with one column on phones, two from the sm: width and `cols` from the
 * lg: width. Nothing uses it at the moment.
 *
 * Caution: Tailwind only generates classes it can find written out in full in
 * the source, so a class assembled from pieces, like lg:grid-cols-${cols} below,
 * does not exist unless the complete name also appears somewhere else. To use
 * this component, replace that piece with a lookup table of full class names,
 * as BaseContainer does.
 */
export function GridLayout({ children, className, gap = 'md', cols = 3 }: GridLayoutProps) {
    return (
        <div className={cn(
            'grid',
            `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${cols}`,
            gap === 'none' ? '' : gap === 'xs' ? 'gap-1' : gap === 'sm' ? 'gap-2' : gap === 'md' ? 'gap-4' : gap === 'lg' ? 'gap-8' : 'gap-12',
            className
        )}>
            {children}
        </div>
    );
}
