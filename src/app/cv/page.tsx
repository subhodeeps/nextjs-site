// src/app/cv/page.tsx
//
// The CV page at /cv. Its text is written in src/content/cv.md: the title, the
// introduction (with the link to the full PDF in public/files/), and the
// sections, such as Employment, Education and Skills. This file reads it when the
// site is built (it has no 'use client', so it never runs in the browser) and
// draws it.
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import TextHeading from '@/components/ui/text-heading/text-heading'
import SectionHeading from '@/components/ui/text-heading/section-heading'
import Text from '@/components/ui/text/text'
import { TerminalNav } from '@/components/ui/terminal-nav/terminal-nav'
import { SectionFooter } from '@/components/layout/footer/SectionFooter'
import { InlineLinks } from '@/components/ui/inline-links/inline-links'
import { icons } from 'lucide-react'
import Image from 'next/image'
import { getCv } from '@/lib/cv/cv'

// The look of the links written in cv.md
const link = 'text-accent hover:underline'

/**
 * The CV page. Each entry is a three-column row: a bullet, the text, and the
 * dates. grid-cols-[auto_1fr_auto] sizes the outer columns to their content and
 * gives the middle one the rest of the width.
 */
export default function CVPage() {
    const cv = getCv()
    const [lead, ...rest] = cv.intro

    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                <TerminalNav />

                <div>
                    <TextHeading as="h1" weight="bold">
                        {cv.title}
                    </TextHeading>

                    {/* The first paragraph in gray, any others in the body color */}
                    {lead && (
                        <Text variant="muted" className="mb-8">
                            <InlineLinks text={lead} linkClassName={link} />
                        </Text>
                    )}
                    {rest.map((paragraph, i) => (
                        <Text key={i} className="mb-8">
                            <InlineLinks text={paragraph} linkClassName={link} />
                        </Text>
                    ))}

                    {cv.sections.map((section) => (
                        <div key={section.name} className="mb-8">
                            <SectionHeading
                                icon={
                                    section.icon
                                        ? icons[section.icon as keyof typeof icons]
                                        : undefined
                                }
                            >
                                {section.name}
                            </SectionHeading>

                            {section.entries.length > 0 && (
                                <div className="flex flex-col gap-3">
                                    {section.entries.map((entry, i) => (
                                        <div
                                            key={i}
                                            className="grid grid-cols-[auto_1fr_auto] items-start gap-x-2"
                                        >
                                            <Text>•</Text>
                                            <Text>
                                                <InlineLinks
                                                    text={entry.text}
                                                    linkClassName={link}
                                                />
                                            </Text>
                                            <Text variant="muted" className="whitespace-nowrap">
                                                {entry.dates}
                                            </Text>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {section.paragraphs.map((paragraph, i) => (
                                <Text key={i}>
                                    <InlineLinks text={paragraph} linkClassName={link} />
                                </Text>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] md:aspect-[21/9] rounded-lg overflow-hidden my-8">
                    <Image
                        src="/gulistan_e_ghalib.jpg"
                        alt="Gulistan-e-Ghalib"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width:640px)100vw,(max-width:1024px)90vw,80vw"
                    />
                </div>
            </StackVertical>

            <SectionFooter showToTop={false} />
        </BaseContainer>
    )
}
