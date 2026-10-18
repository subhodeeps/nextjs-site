// src/components/blocks/homepage/HeroSection.tsx
//
// The top of the home page: the title, the introduction paragraphs and the photo.
// The text and the photo are set in src/content/bio.md. The 'use client' line
// below lets the entrance animations run in the browser.
'use client'

import { motion } from 'framer-motion'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import Image from 'next/image'
import Ruler from '@/components/ui/ruler/ruler'
import { InlineLinks } from '@/components/ui/inline-links/inline-links'
import type { Bio } from '@/lib/homepage/homepage'

// The look of the links written in bio.md
const link = 'text-accent font-bold hover:underline'

/**
 * A paragraph's text, with each ~~text~~ struck through and each [text](address)
 * drawn as a link. Splitting at "~~" puts the struck-through parts at the odd
 * positions.
 */
function BioText({ text }: { text: string }) {
    return (
        <>
            {text.split('~~').map((part, i) =>
                i % 2 === 1 ? (
                    <del key={i}>
                        <InlineLinks text={part} linkClassName={link} />
                    </del>
                ) : (
                    <InlineLinks key={i} text={part} linkClassName={link} />
                ),
            )}
        </>
    )
}

/**
 * The home page's introduction.
 *
 * Each <motion.div> fades its content in: it starts at `initial` (invisible) and
 * moves to `animate` (visible) after `delay` seconds, so the paragraphs appear one
 * after another, the later ones together.
 *
 * @param bio the title, paragraphs and photo, from src/lib/homepage/homepage.ts
 */
export function HeroSection({ bio }: { bio: Bio }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative pb-8"
        >
            <div className="relative">
                <StackVertical gap="xs">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <TextHeading
                            as="h1"
                            className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                        >
                            {bio.title}
                        </TextHeading>
                    </motion.div>

                    {/* Paragraphs, with space between them */}
                    <div>
                        {bio.paragraphs.map((paragraph, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: Math.min(0.4 + 0.1 * i, 0.6) }}
                            >
                                {i > 0 && (
                                    <Ruler color="colorless" marginTop="lg" marginBottom="none" />
                                )}
                                <Text>
                                    <BioText text={paragraph} />
                                </Text>
                            </motion.div>
                        ))}
                    </div>
                </StackVertical>
            </div>

            {/* Cover Image. `fill` makes the image cover its box, whose shape (aspect-[4/3]
                and so on) changes with the screen width; `priority` loads it first. */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 -mb-8"
            >
                <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] md:aspect-[21/9] rounded-lg overflow-hidden">
                    <Image
                        className="object-cover"
                        fill
                        src={bio.photo}
                        alt={bio.photoAlt}
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                    />
                </div>
            </motion.div>
        </motion.div>
    )
}
