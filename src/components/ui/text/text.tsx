// src/components/ui/text/text.tsx
//
// A paragraph of text with the site's sizes and colours, used throughout the
// pages as <Text>...</Text> or, for grey secondary text, <Text variant="muted">.
import { cn } from '@/lib/utils/utils'
import { monoFont } from '@/styles/fonts/fonts'

interface TextProps {
    children: React.ReactNode
    className?: string
    size?: 'xs' | 'smaller' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
    weight?: 'normal' | 'medium' | 'semibold' | 'bold'
    variant?:
        'default' | 'purple' | 'blue' | 'green' | 'red' | 'orange' | 'muted' | 'faint' | 'caption'
    align?: 'left' | 'center' | 'right' | 'justify'
    transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
    truncate?: boolean
}

// Define types for the default styles. TextProps['size'] means "the type of the
// size prop", and NonNullable removes the "or missing" that the ? added.
type TextSize = NonNullable<TextProps['size']>
type TextWeight = NonNullable<TextProps['weight']>
type TextVariant = NonNullable<TextProps['variant']>
type TextAlign = NonNullable<TextProps['align']>
type TextTransform = NonNullable<TextProps['transform']>

// Default styles that will be applied to every Text component
const defaultStyles = {
    size: 'sm' as TextSize,
    weight: 'normal' as TextWeight,
    variant: 'default' as TextVariant,
    align: 'left' as TextAlign,
    transform: 'none' as TextTransform,
    truncate: false,
}

// Font size for each size name; the size grows at the sm: and md: screen widths
const textSizes = {
    xs: 'text-[10px] sm:text-xs md:text-xs', // 10px -> 12px -> 12px
    // A step below the body text, for a page's introduction and the text under a
    // section heading
    smaller: 'text-[11px] sm:text-[13px]', // 11px -> 13px
    sm: 'text-xs sm:text-sm md:text-sm', // 12px -> 14px -> 14px
    base: 'text-sm sm:text-base md:text-base', // 14px -> 16px -> 16px
    lg: 'text-base sm:text-lg md:text-lg', // 16px -> 18px -> 18px
    xl: 'text-lg sm:text-xl md:text-xl', // 18px -> 20px -> 20px
    '2xl': 'text-xl sm:text-2xl md:text-2xl', // 20px -> 24px -> 24px
}

const fontWeights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
}

// Text colour for each variant. The colours come from the amore palettes; a
// dark:... class sets the colour used in the dark theme.
const variants = {
    default: 'text-foreground',
    purple: 'text-accent',
    blue: 'text-amore-blue-ink dark:text-amore-blue-light',
    green: 'text-amore-green-ink dark:text-amore-green-light',
    red: 'text-amore-red-ink dark:text-amore-red-light',
    orange: 'text-amore-amber-ink dark:text-amore-amber-light',
    muted: 'text-muted-foreground',
    // Fainter than muted, for the introduction under a page's title
    faint: 'text-muted-foreground/90',
    caption: 'text-xs text-muted-foreground',
}

const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
}

const transforms = {
    none: '',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
}

/**
 * A <p> of text.
 *
 * @param size      font size (default 'sm': 12px on phones, 14px from sm: up)
 * @param weight    'normal' (default), 'medium', 'semibold' or 'bold'
 * @param variant   colour (default 'default'); 'muted' for secondary text
 * @param align     text alignment (default 'left')
 * @param transform upper- or lower-case the text
 * @param truncate  cut the text off with "..." when it does not fit on one line
 * @param className extra Tailwind classes, which win over the ones above
 */
export default function Text({
    children,
    className,
    size = defaultStyles.size,
    weight = defaultStyles.weight,
    variant = defaultStyles.variant,
    align = defaultStyles.align,
    transform = defaultStyles.transform,
    truncate = defaultStyles.truncate,
}: TextProps) {
    // Use the provided value or fall back to default. (The defaults above already
    // do this; these lines are a second safety net. `a || b` means a, or b if a
    // is empty.)
    const finalSize = size || defaultStyles.size
    const finalWeight = weight || defaultStyles.weight
    const finalVariant = variant || defaultStyles.variant
    const finalAlign = align || defaultStyles.align
    const finalTransform = transform || defaultStyles.transform

    return (
        <p
            className={cn(
                monoFont.className,
                textSizes[finalSize],
                fontWeights[finalWeight],
                variants[finalVariant],
                alignments[finalAlign],
                transforms[finalTransform],
                truncate && 'truncate',
                className,
            )}
        >
            {children}
        </p>
    )
}
