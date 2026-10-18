// src/components/layout/footer/HomepageFooter.tsx
//
// The footer of the home page: a "To the Top" link, the social icons and the
// copyright line. The shared parts are drawn by BaseFooter.tsx.
'use client'

import { motion } from 'framer-motion'
import { BaseFooter } from './BaseFooter'
import { FooterLink } from './_components/FooterLink'

interface HomepageFooterProps {
    showToTop?: boolean
    showSocialLinks?: boolean
    showCopyright?: boolean
}

/**
 * The home page footer, which fades in last, just after the Socials section.
 * Each `show...` prop (all true by default) switches one part of it on or off.
 */
export function HomepageFooter({
    showToTop = true,
    showSocialLinks = true,
    showCopyright = true,
}: HomepageFooterProps) {
    // The link row: just "To the Top", or nothing (null draws nothing)
    const navigationLinks = showToTop ? <FooterLink href="#top">To the Top</FooterLink> : null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
        >
            <BaseFooter
                navigationLinks={navigationLinks}
                className="mt-6"
                showToTop={showToTop}
                showSocialLinks={showSocialLinks}
                showCopyright={showCopyright}
            />
        </motion.div>
    )
}
