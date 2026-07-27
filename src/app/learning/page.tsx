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
import Image from "next/image"

export default function Learning() {
    return (
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
                        A collection of references and notes, mostly on physics, maths and programming. 
                    </Text>
                </div>

                <Text variant="muted" className="mb-8">

                    Over time, I've collected and written notes on things I've learned or found interesting, mainly for my own reference. Since others might find them useful too, I've made them public. Most of the collection lives in a separate{" "}

                    <Link

                        href="https://just-the-notes.vercel.app/"

                        className="text-purple-500 font-bold hover:underline"

                    >

                        repository

                    </Link>. Below are a few highlights from the collection.

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

                <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] md:aspect-[21/9] rounded-lg overflow-hidden my-8">
                    <Image
                        className="object-cover"
                        fill
                        src="/books.jpg"
                        alt="Some books!."
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                    />
                </div>

                <SectionFooter color="purple" showToTop={false} />

            </StackVertical>
        </BaseContainer>
    )
}
