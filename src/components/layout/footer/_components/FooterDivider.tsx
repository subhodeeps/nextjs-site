// src/components/layout/footer/_components/FooterDivider.tsx
//
// The short line between two footer links: "To the Top | Home Page".
import { cn } from '@/lib/utils/utils';

interface FooterDividerProps {
    vertical?: boolean;
}

/**
 * A small dividing line in the accent colour.
 *
 * @param vertical a vertical bar (default); false gives a short horizontal dash
 */
export function FooterDivider({ vertical = true }: FooterDividerProps) {
    return (
        <div
            className={cn(
                vertical ? "h-4 sm:h-4.5 w-[1.5px]" : "h-[1.5px] w-4 sm:w-4.5",
                "mx-3 sm:mx-4",
                "bg-accent-muted/40"
            )}
        />
    )
}
