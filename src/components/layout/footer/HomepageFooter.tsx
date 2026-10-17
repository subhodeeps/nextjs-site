// src/components/layout/footer/HomepageFooter.tsx
//
// The footer of the home page: a "To the Top" link, the social icons and the
// copyright line. The shared parts are drawn by BaseFooter.tsx.
'use client'

import { BaseFooter } from './BaseFooter'
import { FooterLink } from './_components/FooterLink'

interface HomepageFooterProps {
    showToTop?: boolean;
    showSocialLinks?: boolean;
    showCopyright?: boolean;
}

/**
 * The home page footer. Each `show...` prop (all true by default) switches one
 * part of it on or off.
 */
export function HomepageFooter({
    showToTop = true,
    showSocialLinks = true,
    showCopyright = true
}: HomepageFooterProps) {
    // The link row: just "To the Top", or nothing (null draws nothing)
    const navigationLinks = showToTop ? (
        <FooterLink href="#top">To the Top</FooterLink>
    ) : null

    return (
        <BaseFooter
            navigationLinks={navigationLinks}
            className="mt-6"
            showToTop={showToTop}
            showSocialLinks={showSocialLinks}
            showCopyright={showCopyright}
        />
    )
}
