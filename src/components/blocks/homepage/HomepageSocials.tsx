// src/components/blocks/homepage/HomepageSocials.tsx
//
// The "Socials" paragraph at the bottom of the home page.
'use client'

import SectionHeading from '@/components/ui/text-heading/section-heading'
import { AtSign } from 'lucide-react'
import Text from '@/components/ui/text/text'
import Link from 'next/link'

/**
 * The Socials section, with the email address. <Link> from
 * next/link works like <a>; for pages of this site it also loads the next page
 * without a full reload.
 */
export function HomepageSocials() {
    return (
        <div>
            <SectionHeading icon={AtSign}>Socials</SectionHeading>
            <Text>
                I enjoy meeting and collaborating with new people. So, please feel free to ping me
                at{' '}
                <Link
                    href="mailto:physics.subhodeep@gmail.com"
                    className="text-accent hover:underline"
                >
                    physics.subhodeep@gmail.com
                </Link>{' '}
                if you’d like to discuss or chat about something with me!
            </Text>
        </div>
    )
}
