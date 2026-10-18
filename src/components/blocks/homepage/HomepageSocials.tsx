// src/components/blocks/homepage/HomepageSocials.tsx
//
// The "Socials" section at the bottom of the home page. Its text is written in
// src/content/socials.md.
'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/text-heading/section-heading'
import { AtSign } from 'lucide-react'
import Text from '@/components/ui/text/text'
import { InlineLinks } from '@/components/ui/inline-links/inline-links'

/**
 * The Socials section, which fades in just after the updates. The first
 * paragraph, with the email address, is shown in the body color; the later ones,
 * such as the line with the other sites, are smaller and gray, with their links
 * underlined with dots.
 *
 * @param paragraphs the paragraphs, from src/lib/homepage/homepage.ts
 */
export function HomepageSocials({ paragraphs }: { paragraphs: string[] }) {
    const [lead, ...rest] = paragraphs
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
        >
            <SectionHeading icon={AtSign}>Socials</SectionHeading>
            <Text size="section">
                <InlineLinks text={lead ?? ''} linkClassName="text-accent hover:underline" />
            </Text>
            {rest.map((paragraph, i) => (
                <Text key={i} size="xs" variant="muted" className="mt-3">
                    <InlineLinks
                        text={paragraph}
                        linkClassName="underline decoration-dotted underline-offset-2 hover:text-accent"
                    />
                </Text>
            ))}
        </motion.div>
    )
}
