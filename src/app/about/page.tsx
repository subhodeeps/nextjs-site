// src/app/about/page.tsx
//
// The About page at /about: the photo and the biography. The text, the date and
// the photo are written in src/content/about.md, which this file reads when the
// site is built (it has no 'use client', so it never runs in the browser). The
// title in the browser tab is set in layout.tsx.
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import TextHeading from '@/components/ui/text-heading/text-heading'
import { SectionFooter } from '@/components/layout/footer/SectionFooter'
import Text from '@/components/ui/text/text'
import { TerminalNav } from '@/components/ui/terminal-nav/terminal-nav'
import { InlineLinks } from '@/components/ui/inline-links/inline-links'
import { getAbout } from '@/lib/about/about'

// The look of the links written in about.md
const link = 'text-accent font-bold hover:underline'

/** The About page: navigation, title, date, photo with biography, footer. */
export default function About() {
    const about = getAbout()

    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                <TerminalNav />

                <div>
                    <TextHeading as="h1" weight="bold">
                        {about.title}
                    </TextHeading>
                    <Text variant="muted" size="xs" className="mb-8">
                        {about.date}
                    </Text>

                    {/* The photo floats left, so the text wraps around it. It is a plain <img>,
                        which `npm run lint` warns about because Next.js prefers its <Image>. */}
                    <div className="flow-root">
                        <div className="float-left mr-6 mb-4 w-48 md:w-64">
                            <img
                                src={about.photo}
                                alt={about.photoAlt}
                                className="rounded-lg w-full h-auto mb-2"
                            />
                            <Text size="xs" variant="muted" className="text-center">
                                <InlineLinks text={about.caption} linkClassName={link} />
                            </Text>
                        </div>

                        <div className="space-y-8">
                            {about.paragraphs.map((paragraph, i) => (
                                <Text key={i}>
                                    <InlineLinks text={paragraph} linkClassName={link} />
                                </Text>
                            ))}
                        </div>
                    </div>
                </div>
            </StackVertical>
            <SectionFooter />
        </BaseContainer>
    )
}
