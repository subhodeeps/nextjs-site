'use client'

import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import Link from 'next/link'

export function HomepageSocials() {
    return (
        <div>
            <TextHeading as="h2" weight="bold">Socials</TextHeading>
            <Text>
            I enjoy meeting and collaborating with new people. So, please feel free to ping me at <Link href="mailto:physics.subhodeep@gmail.com" className="text-purple-500 hover:underline">physics.subhodeep@gmail.com</Link> or on <Link href="https://x.com/astres_occlus" className="text-purple-500 hover:underline">Twitter</Link> if you’d like to discuss or chat about something with me!
            </Text>
        </div>

    )
} 