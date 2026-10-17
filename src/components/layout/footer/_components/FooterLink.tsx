// src/components/layout/footer/_components/FooterLink.tsx
//
// A text link in a page footer, such as "To the Top" or "Home Page", with an
// underline that grows in on hover. Used by the footer components in this folder.
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/utils'

interface FooterLinkProps {
    href: string
    children: React.ReactNode
    external?: boolean
    icon?: React.ReactNode
}

/**
 * A footer link in the accent colour.
 *
 * @param href     where it goes; "#top" scrolls to the top of the page
 * @param external open the link in a new tab
 * @param icon     an optional icon before the text, which tilts on hover
 */
export function FooterLink({ href, children, external, icon }: FooterLinkProps) {
    return (
        <Link
            href={href}
            className={cn(
                'flex items-center',
                'gap-1 sm:gap-2',
                'text-accent hover:text-accent-muted',
                'text-[11px] sm:text-sm font-medium',
                'transition-all duration-200 ease-in-out',
                'hover:translate-y-[-1px]',
                // The underline: an empty after: element, 1px high, whose width
                // grows from 0 to the full width of the link on hover
                "relative after:content-[''] after:absolute after:w-0 after:h-[1px]",
                'after:bg-accent-muted after:left-0 after:bottom-[-2px]',
                'after:transition-all after:duration-200',
                'hover:after:w-full',
            )}
            // For external links, add target="_blank" (new tab) and a safety
            // setting; `...` spreads these attributes into the tag
            {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        >
            {icon && (
                <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center"
                >
                    {icon}
                </motion.div>
            )}
            {children}
        </Link>
    )
}
