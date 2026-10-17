// src/components/layout/footer/SectionFooter.tsx
//
// The footer of a section's main page (About, Research, CV, Learning, Reading,
// Blog): "To the Top | Home Page", the social icons and the copyright line.
'use client'

import { BaseFooter } from './BaseFooter'
import { FooterLink } from './_components/FooterLink'
import { FooterDivider } from './_components/FooterDivider'

interface SectionFooterProps {
    showToTop?: boolean
    showHomePage?: boolean
    showSocialLinks?: boolean
    showCopyright?: boolean
}

/**
 * A section page's footer, as <SectionFooter showToTop={false} />. Each `show...`
 * prop (all true by default) switches one part of it on or off.
 */
export function SectionFooter({
    showToTop = true,
    showHomePage = true,
    showSocialLinks = true,
    showCopyright = true,
}: SectionFooterProps) {
    // The link row; the divider appears only when there is a link on each side
    const navigationLinks = (
        <>
            {showToTop && (
                <>
                    <FooterLink href="#top">To the Top</FooterLink>
                    {showHomePage && <FooterDivider />}
                </>
            )}
            {showHomePage && <FooterLink href="/">Home Page</FooterLink>}
        </>
    )

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
