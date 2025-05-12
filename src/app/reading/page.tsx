'use client'

import BaseContainer from "@/components/layout/container/base-container"
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import TextHeading from "@/components/ui/text-heading/text-heading"
import { SectionFooter } from "@/components/layout/footer/SectionFooter"
import Text from "@/components/ui/text/text"
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import Link from "next/link"
import Image from 'next/image'

export default function Learning() {
    const books = [
        {
            id: 1,
            title: "Breasts and Eggs",
            author: "Mieko Kawakami",
            cover: "/covers/kawakami.jpeg"
        },
        {
            id: 2,
            title: "The Meaning of Science",
            author: "Tim Lewens",
            cover: "/covers/lewens.jpg"
        },
        {
            id: 3,
            title: "Orlando",
            author: "Virginia Woolf",
            cover: "/covers/orlando.jpg"
        },
        {
            id: 4,
            title: "Case Histories",
            author: "Kate Atkinson",
            cover: "/covers/brodie1.jpg"
        },
        {
            id: 5,
            title: "The Songlines",
            author: "Bruce Chatwin",
            cover:  "/covers/songlines.jpg"
        },
         {
            id: 6,
            title: "Butter",
            author: "Asako Yuzuki",
            cover:  "/covers/butter_india.jpg"
        }
    ];

    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                {/* Breadcrumb */}
                <div className="flex items-center justify-between">
                    <DynamicBreadcrumb 
                        items={[
                            { href: '/', label: 'Home', emoji: '👾' },
                            { label: 'Reading' }
                        ]}
                    />
                    <ThemeToggle />
                </div>

                {/* Header Content */}
                <div>
                    <TextHeading as="h1" weight="bold">
                        Reading
                    </TextHeading>
                    <Text variant="muted" className="mb-8">
                        Books that I am currently reading (or, at least, trying to).
                    </Text>

                    {/* Book Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-8">
                        {books.map((book) => (
                            <div key={book.id} className="flex flex-col space-y-2">
                                <div className="w-full cursor-pointer group">
                                    <Image
                                        src={book.cover}
                                        alt={book.title}
                                        className="rounded-lg shadow-md transition-transform duration-200 group-hover:scale-105 w-full h-auto"
                                        width={240}
                                        height={320}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <TextHeading as="h3"  weight="medium" className="line-clamp-2">
                                        {book.title}
                                    </TextHeading>
                                    <Text variant="muted" >
                                        {book.author}
                                    </Text>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Text variant="muted" className="mb-8">
                        A simularca of (a fragment of) my library can be found <Link href="https://subhodeeps.github.io/jekyll-bookworm/" className="text-purple-500 font-bold hover:underline">here</Link>. I will however move the content  to my <Link href="https://just-the-notes.vercel.app/" className="text-purple-500 font-bold hover:underline">foam worksapce</Link>.
                    </Text>
                </div>
            </StackVertical>
            <SectionFooter color="purple" showToTop={false} />
        </BaseContainer>
    )
}