// src/app/research/page.tsx
//
// The Research page at /research: a summary of the research, then the preprints,
// the published papers and the thesis. The papers are listed by their INSPIRE
// record numbers in ./_data/papers.ts; to add one, add a line there. Their details
// are fetched from INSPIRE when the site is built (./_lib/inspire.ts; this file
// has no 'use client', so it never runs in the browser), and each paper is drawn
// by ./_components/PaperItem.tsx.
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import TextHeading from '@/components/ui/text-heading/text-heading'
import SectionHeading from '@/components/ui/text-heading/section-heading'
import { BookText, FileCheck, FileClock, type LucideIcon } from 'lucide-react'
import { SectionFooter } from '@/components/layout/footer/SectionFooter'
import Text from '@/components/ui/text/text'
import { TerminalNav } from '@/components/ui/terminal-nav/terminal-nav'
import Link from 'next/link'
import Ruler from '@/components/ui/ruler/ruler'
import Image from 'next/image'
import { me, papers, thesis } from './_data/papers'
import { getPaper, getPapers, type Paper } from './_lib/inspire'
import { PaperItem } from './_components/PaperItem'

/** A section of papers under its heading, or nothing if there are none */
function PaperSection({
    heading,
    icon,
    items,
}: {
    heading: string
    icon: LucideIcon
    items: Paper[]
}) {
    if (items.length === 0) return null
    return (
        <section>
            <SectionHeading icon={icon}>{heading}</SectionHeading>
            <StackVertical gap="lg">
                {items.map((paper) => (
                    <PaperItem key={paper.inspire} paper={paper} me={me} />
                ))}
            </StackVertical>
        </section>
    )
}

/** The Research page: summary, preprints, publications, thesis, a photo and the footer. */
export default async function Research() {
    // Fetched from INSPIRE when the site is built (async/await waits for them)
    const all = await getPapers(papers)
    const thesisPaper = await getPaper(thesis)

    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                <TerminalNav />

                {/* Header */}
                <div>
                    <TextHeading as="h1" weight="bold">
                        Research and Publications
                    </TextHeading>

                    <Text variant="muted" className="mb-8">
                        My research focuses on strong-field probes of general relativity, black
                        holes, and gravitational-wave physics. I use theoretical and computational
                        methods, particularly black hole perturbation theory and numerical
                        relativity, to study gravitational collapse, quasinormal modes, ringdown
                        physics and late-time dynamics. More broadly, I am interested in
                        understanding how gravity behaves in extreme regions of spacetime and how
                        gravitational waves, black hole shadows, gravitational lensing, and geodesic
                        motion can be used to test gravity in the strong-field regime.
                    </Text>

                    <Text variant="muted" className="mb-8">
                        I have also been fortunate to collaborate with many researchers in these
                        areas. The{' '}
                        <Link
                            href="/collaborations"
                            className="text-accent font-bold hover:underline"
                        >
                            collaborations
                        </Link>{' '}
                        page contains photographs of some of my mentors, collaborators, co-authors,
                        and cherished colleagues.
                    </Text>

                    <StackVertical gap="lg">
                        <PaperSection
                            heading="Preprints"
                            icon={FileClock}
                            items={all.filter((p) => p.kind === 'preprint')}
                        />
                        <PaperSection
                            heading="Published Papers"
                            icon={FileCheck}
                            items={all.filter((p) => p.kind === 'published')}
                        />
                        <PaperSection heading="Thesis" icon={BookText} items={[thesisPaper]} />
                    </StackVertical>
                </div>
            </StackVertical>

            <Ruler color="colorless" marginTop="lg" marginBottom="none" />

            <Text variant="muted" className="mb-8">
                Please visit my{' '}
                <Link
                    href="https://inspirehep.net/authors/1797180?ui-citation-summary=true"
                    className="text-accent font-bold hover:underline"
                >
                    INSPIRE-HEP profile
                </Link>{' '}
                for bibliometrics and a possibly updated list of papers.
            </Text>

            <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] md:aspect-[21/9] rounded-lg overflow-hidden my-8">
                <Image
                    className="object-cover"
                    fill
                    src="/rudranath.jpg"
                    alt="The Garhwal Himalayas, en route to Rudranath Temple, Sept 2023."
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                />
            </div>

            <SectionFooter showToTop={false} />
        </BaseContainer>
    )
}
