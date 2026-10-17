// src/components/layout/footer/IndividualPageFooter.tsx
//
// The footer of a page inside a section, such as a blog post: "To the Top |
// <Parent> Page | Home Page", the social icons and the copyright line. The
// parent page is worked out from the page's address.
'use client'

import { usePathname } from 'next/navigation'
import { BaseFooter } from './BaseFooter'
import { FooterLink } from './_components/FooterLink'
import { FooterDivider } from './_components/FooterDivider'

interface IndividualPageFooterProps {
    sectionName?: string
    parentPageName?: string
    showToTop?: boolean
    showParentPage?: boolean
    showHomePage?: boolean
    showSocialLinks?: boolean
    showCopyright?: boolean
}

/**
 * A subpage's footer.
 *
 * @param sectionName    name of the section, used for pages one level below home
 * @param parentPageName name to show for the parent page, instead of one made
 *                       from the address
 * @param show...        each switches one part of the footer on or off (all true by default)
 */
export function IndividualPageFooter({
    sectionName,
    parentPageName,
    showToTop = true,
    showParentPage = true,
    showHomePage = true,
    showSocialLinks = true,
    showCopyright = true,
}: IndividualPageFooterProps) {
    // The current address, such as "/blog/rsync-file-transfer"
    const pathname = usePathname()

    // Get the parent path and name dynamically if not provided. For
    // "/learning/refs" the parent is "/learning", shown as "Learning Page".
    const getParentInfo = () => {
        if (parentPageName)
            return { name: parentPageName, path: pathname.split('/').slice(0, -1).join('/') }

        const pathParts = pathname.split('/')
        // Remove empty string and current page
        const filteredParts = pathParts.filter((part) => part)

        if (filteredParts.length <= 1) {
            return { name: sectionName || 'Home', path: '/' }
        }

        // Get parent path (one level up)
        const parentPath = '/' + filteredParts.slice(0, -1).join('/')

        // Format the parent name: a folder called "field-notes" becomes "Field Notes"
        const parentName = filteredParts[filteredParts.length - 2]
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')

        return { name: parentName, path: parentPath }
    }

    // Take `name` and `path` out of the result, renamed parentName and parentPath
    const { name: parentName, path: parentPath } = getParentInfo()

    const navigationLinks = (
        <div className="flex flex-wrap items-center justify-center gap-1">
            {showToTop && (
                <>
                    <FooterLink href="#top">To the Top</FooterLink>
                    {(showParentPage || showHomePage) && <FooterDivider />}
                </>
            )}
            {showParentPage && (
                <>
                    <FooterLink href={parentPath}>{parentName} Page</FooterLink>
                    {showHomePage && <FooterDivider />}
                </>
            )}
            {showHomePage && <FooterLink href="/">Home Page</FooterLink>}
        </div>
    )

    return (
        <BaseFooter
            navigationLinks={navigationLinks}
            className="mt-6"
            showToTop={showToTop}
            showSectionName={showParentPage}
            showSocialLinks={showSocialLinks}
            showCopyright={showCopyright}
        />
    )
}
