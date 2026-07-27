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

export default function Reading() {
    const books = [
        {
            id: 1,
            title: "Figuring",
            author: "Maria Popova",
            cover: "/covers/popova.jpg"
        },
        {
            id: 2,
            title: "Pachinko",
            author: "Min Jin Lee",
            cover: "/covers/pachinko.jpg"
        },
        {
            id: 3,
            title: "Inspector Imanishi Investigates",
            author: "Seicho Matsumoto",
            cover: "/covers/imanishi.jpg"
        },
        {
            id: 4,
            title: "Aristotle: Understanding the World's Greatest Philosopher",
            author: "John Sellars",
            cover: "/covers/aristotle.jpg"
        },
        {
            id: 5,
            title: "In a Flight of Starlings: The Wonders of Complex Systems",
            author: "Giorgio Parisi",
            cover:  "/covers/parisi.jpg"
        },
        {
            id: 6,
            title: "The Sense of Style: The Thinking Person's Guide to Writing in the 21st Century",
            author: "Steven Pinker",
            cover:  "/covers/sos.jpg"
        },
        {
            id: 7,
            title: "Ghost-Eye",
            author: "Amitav Ghosh",
            cover:  "/covers/ghosteye.jpg"
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
                    <TextHeading as="h1" weight="bold" className="mb-2">
                        Reading
                    </TextHeading>
                    
                    <Text variant="muted" className="mb-12">
                        Notes on things I've read, links to pieces I love, plus the books I'm trying to get through.
                    </Text>

                    {/* Marginalia Section Header */}
                    <div className="mb-12">
                        <TextHeading as="h3" weight="semibold" className="mb-2 text-xl sm:text-2xl">
                            Marginalia
                        </TextHeading>
                        
                        <Text variant="muted">
                            Excerpts, takeaways and collections of short-form writing that left an impression. You can browse the collection <Link href="/reading/marginalia" className="text-purple-500 font-bold hover:underline">here</Link>.
                        </Text>
                    </div>

                    {/* Heading before the gallery */}
                    <TextHeading as="h3" weight="semibold" className="mb-2 text-xl sm:text-2xl">
                        Currently Reading
                    </TextHeading>
                    
                    {/* Combined Text */}
                    <Text variant="muted" className="mb-8">
                        Books that I am currently reading (or, at least, trying to). A simularca of (a fragment of) my library can be found <Link href="https://hobby-site.vercel.app/" className="text-purple-500 font-bold hover:underline">here</Link>.
                    </Text>

                    {/* Book Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
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
                                    <TextHeading as="h3" weight="medium" className="line-clamp-2">
                                        {book.title}
                                    </TextHeading>
                                    <Text variant="muted">
                                        {book.author}
                                    </Text>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </StackVertical>
            <SectionFooter color="purple" showToTop={false} />
        </BaseContainer>
    )
}