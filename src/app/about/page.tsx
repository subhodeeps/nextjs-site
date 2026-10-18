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
import { headingFont } from '@/styles/fonts/fonts'
import { bengaliFont } from '@/styles/fonts/bengali'

// The look of the links written in about.md
const link = 'text-accent font-bold hover:underline'

// The title's fonts: Fira Code, as for every heading, then Anek Bangla for the
// Bengali letters, which Fira Code does not have
const titleFont = {
    fontFamily: `${headingFont.style.fontFamily}, ${bengaliFont.style.fontFamily}`,
}

/** The About page: navigation, title, date, photo with biography, footer. */
export default function About() {
    const about = getAbout()

    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                <TerminalNav />

                <div>
                    <TextHeading as="h1" weight="bold">
                        <span style={titleFont}>{about.title}</span>
                    </TextHeading>
                    <Text variant="muted" size="xs" className="mb-8">
                        {about.date}
                    </Text>

                    {/* The photo floats left, so the text wraps around it. It is a plain <img>,
                        which `npm run lint` warns about because Next.js prefers its <Image>.
                        aspect-[4/5] shows it in a frame a quarter taller than it is wide, and
                        object-cover fills the frame without stretching the photo, trimming a
                        little from its sides. */}
                    <div className="flow-root">
                        <div className="float-left mr-6 mb-4 w-48 md:w-64">
                            <img
                                src={about.photo}
                                alt={about.photoAlt}
                                className="rounded-lg w-full aspect-[4/5] object-cover mb-2"
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

                            {/* Where the title comes from: small and faint, with the link
                                underlined with dots, as in the homepage's Socials section */}
                            {about.titleCredit && (
                                <Text
                                    size="xs"
                                    variant="muted"
                                    className="pt-4 text-muted-foreground/60"
                                >
                                    <InlineLinks
                                        text={about.titleCredit}
                                        linkClassName="underline decoration-dotted underline-offset-2 hover:text-accent"
                                    />
                                </Text>
                            )}
                        </div>
                    </div>
                </div>
            </StackVertical>
            <SectionFooter />
        </BaseContainer>
    )
}
