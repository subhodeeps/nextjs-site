// src/components/ui/ruler/ruler.tsx
//
// A horizontal (or vertical) dividing line, like <hr>. Markdown's --- lines are
// drawn with it (see src/lib/mdx/mdx-components.tsx), and pages use it as
// <Ruler /> or, for space without a visible line, <Ruler color="colorless" />.
import { cn } from '@/lib/utils/utils'

interface RulerProps {
    className?: string;
    orientation?: 'horizontal' | 'vertical';
    weight?: 'thin' | 'normal' | 'slightlyThick' | 'thick' | 'heavy';
    color?: 'default' | 'muted' | 'purple' | 'gray' | 'white' | 'colorless';
    marginTop?: 'none' | 'sm' | 'md' | 'lg';
    marginBottom?: 'none' | 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

// Line thickness
const weights = {
    thin: 'border-[0.5px]',
    normal: 'border-[1px]',
    slightlyThick: 'border-[1.5px]',
    thick: 'border-[2px]',
    heavy: 'border-[4px]'
}

// Line colour; 'purple' is the theme accent, and 'gray' is the amore slate palette
const colors = {
    default: 'border-border',
    muted: 'border-muted',
    purple: 'border-accent-muted/50',
    gray: 'border-amore-slate-light dark:border-amore-slate-main',
    white: 'border-white',
    colorless: 'border-transparent'
}

// Space above and below a horizontal line. The ! makes these win over margins
// that a surrounding component sets.
const marginTop = {
    none: '!mt-0',
    sm: '!mt-2 sm:!mt-2',
    md: '!mt-4 sm:!mt-4',
    lg: '!mt-8 sm:!mt-8'
}

const marginBottom = {
    none: '!mb-0',
    sm: '!mb-2 sm:!mb-2',
    md: '!mb-4 sm:!mb-4',
    lg: '!mb-8 sm:!mb-8'
}

// Space to the left and right of a vertical line (it reuses the marginTop prop)
const verticalSpacings = {
    none: 'mx-0',
    sm: 'mx-2',
    md: 'mx-4',
    lg: 'mx-8'
}

/**
 * A dividing line.
 *
 * @param orientation  'horizontal' (default) or 'vertical'
 * @param weight       line thickness (default 'normal', 1px)
 * @param color        line colour (default 'gray'); 'colorless' gives only space
 * @param marginTop    space above (default 'md')
 * @param marginBottom space below (default 'md')
 * @param fullWidth    false makes the line half as wide, centred
 */
export default function Ruler({
    className,
    orientation = 'horizontal',
    weight = 'normal',
    color = 'gray',
    marginTop: mt = 'md',
    marginBottom: mb = 'md',
    fullWidth = true
}: RulerProps) {
    const isHorizontal = orientation === 'horizontal'

    return (
        // A <div> with only a top (or left) border draws the line. The role and
        // aria attributes tell screen readers that it is a separator.
        <div
            className={cn(
                'border-0',
                isHorizontal ? 'w-full border-t' : 'h-full border-l',
                weights[weight],
                colors[color],
                isHorizontal ? [marginTop[mt], marginBottom[mb]] : verticalSpacings[mt],
                !fullWidth && 'w-1/2 mx-auto',
                'transition-colors duration-200',
                className
            )}
            role="separator"
            aria-orientation={orientation}
        />
    )
}
