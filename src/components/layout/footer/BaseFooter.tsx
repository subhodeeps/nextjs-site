// src/components/layout/footer/BaseFooter.tsx
//
// The parts every page footer shares: a faint dividing line, a row of links
// supplied by the calling footer, the social icons and the copyright line.
// HomepageFooter, SectionFooter and IndividualPageFooter are built on it; to
// change a social link, edit the socialLinks list below.
'use client'

import { cn } from '@/lib/utils/utils'
import { monoFont } from '@/styles/fonts/fonts'
import {
    SiArxiv,
    SiX,
    SiInspire,
    SiGithub,
    SiGooglescholar,
    SiSemanticscholar,
    SiResearchgate,
    SiGmail,
    SiLinkedin,
} from 'react-icons/si'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface BaseFooterProps {
    navigationLinks?: React.ReactNode
    className?: string
    showToTop?: boolean
    showSectionName?: boolean
    showSocialLinks?: boolean
    showCopyright?: boolean
}

/**
 * The shared footer.
 *
 * @param navigationLinks the row of links to show, such as "To the Top | Home Page"
 * @param show...         each switches one part of the footer on or off (all true
 *                        by default); the link row appears when showToTop or
 *                        showSectionName is on
 */
export function BaseFooter({
    navigationLinks,
    className,
    showToTop = true,
    showSectionName = true,
    showSocialLinks = true,
    showCopyright = true,
}: BaseFooterProps) {
    // The social icons, in order: each has the address it links to and the icon
    // to show (icons from the react-icons package, Si... for Simple Icons)
    const socialLinks = [
        {
            href: 'https://inspirehep.net/authors/1797180?ui-citation-summary=true',
            icon: <SiInspire className="w-4 h-4" />,
        },
        {
            href: 'https://scholar.google.com/citations?user=WpYbE3oAAAAJ&hl=en',
            icon: <SiGooglescholar className="w-4 h-4" />,
        },
        { href: 'https://arxiv.org/a/sarkar_s_11.html', icon: <SiArxiv className="w-4 h-4" /> },
        {
            href: 'https://www.semanticscholar.org/author/Subhodeep-Sarkar/9729924',
            icon: <SiSemanticscholar className="w-4 h-4" />,
        },
        {
            href: 'https://www.researchgate.net/profile/Subhodeep_Sarkar',
            icon: <SiResearchgate className="w-4 h-4" />,
        },
        {
            href: 'mailto:physics.subhodeep@gmail.com',
            icon: <SiGmail className="w-3 h-3 sm:w-4 sm:h-4" />,
        },
        {
            href: 'https://github.com/subhodeeps',
            icon: <SiGithub className="w-3 h-3 sm:w-4 sm:h-4" />,
        },
        { href: 'https://x.com/astres_occlus', icon: <SiX className="w-3 h-3 sm:w-4 sm:h-4" /> },
        {
            href: 'https://in.linkedin.com/in/subhodeeps',
            icon: <SiLinkedin className="w-3 h-3 sm:w-4 sm:h-4" />,
        },
    ]

    return (
        <footer className={cn('mt-auto pt-12', className)}>
            {/* The dividing line, fading out towards both ends */}
            <div className="relative w-full mb-8">
                <div className="absolute inset-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-muted/20 to-transparent" />
            </div>

            <div
                className={cn(
                    monoFont.className,
                    'w-full max-w-screen-md mx-auto px-4',
                    'flex flex-col items-center gap-4 sm:gap-6',
                    'text-sm text-muted-foreground/60',
                )}
            >
                {navigationLinks && (showToTop || showSectionName) && (
                    <div className="flex flex-wrap items-center justify-center gap-x-3">
                        {navigationLinks}
                    </div>
                )}

                {(showSocialLinks || showCopyright) && (
                    <div className="flex flex-col items-center gap-4">
                        {showSocialLinks && (
                            <div className="flex items-center gap-6">
                                {/* One icon per link; each lifts slightly on hover and
                                    fades in a little after the one before */}
                                {socialLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.2,
                                            delay: index * 0.1,
                                        }}
                                    >
                                        <Link
                                            href={link.href}
                                            target={
                                                link.href.startsWith('mailto:')
                                                    ? undefined
                                                    : '_blank'
                                            }
                                            className={cn(
                                                'block text-accent-muted hover:text-accent',
                                                'transition-all duration-200',
                                                '-m-2 p-2',
                                                'hover:bg-accent-muted/10 rounded-md',
                                                'hover:shadow-md hover:shadow-accent-muted/5',
                                            )}
                                        >
                                            {link.icon}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {showCopyright && (
                            <motion.span
                                className="text-[10px] sm:text-xs text-accent"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                {/* The current year, worked out when the page is built */}©{' '}
                                {new Date().getFullYear()} subhodeeps
                            </motion.span>
                        )}
                    </div>
                )}
            </div>

            <div className="h-8" />
        </footer>
    )
}

export default BaseFooter
