'use client'

import { StackVertical } from "@/components/layout/layout-stack/layout-stack";
import BaseContainer from "@/components/layout/container/base-container";
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import { notes } from "./_data/posts";
import { ReferenceCard } from "./_components/ReferenceCard";
import TextHeading from "@/components/ui/text-heading/text-heading";
import Text from "@/components/ui/text/text";
import { SectionFooter } from "@/components/layout/footer/SectionFooter";
import Link from 'next/link'

export default function Learning() {
    return (
        <>
            <BaseContainer size="md" paddingX="md" paddingY="lg">
                <StackVertical gap="md">
                    <div className="flex items-center justify-between">
                        <DynamicBreadcrumb
                            items={[
                                { href: "/", label: "Home", emoji: "👾" },
                                { label: "Learning" }
                            ]}
                        />
                        <ThemeToggle />
                    </div>

                    <div>
                        <TextHeading as="h1" weight="bold">
                            Learning
                        </TextHeading>
                        <Text variant="muted" className="mb-8">
                            A collection of references and notes that I have collected from my learning journey. Mostly
                            Math and ML-related.
                        </Text>
                    </div>

                    <Text variant="muted" className="mb-8">
                        Most of the stuff listed here is hosted on a separate <Link href="https://notes-subhodeeps.vercel.app/" className="text-purple-500 font-bold hover:underline">project/repository</Link> because [a] I wanted to keep using other tools to make sites, [b] I wanted to implement a roam-research like workspace based on the principle of <i>Zettelkasten</i> and [c] I failed to make markdown and KaTeX work over here. 
                    </Text>

                    <StackVertical gap="none">
                        {notes.map((note, index) => (
                            <ReferenceCard
                                key={note.id}
                                post={note}
                                isLast={index === notes.length - 1}
                            />
                        ))}
                    </StackVertical>
                </StackVertical>
            </BaseContainer>
            <SectionFooter color="purple" showToTop={false} />
        </>
    )
}