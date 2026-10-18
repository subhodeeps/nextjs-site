// src/app/reading/page.tsx
//
// The Reading page at /reading: a link to Marginalia, then the books currently
// being read. The books are listed in ./_data/books.ts, and their covers are in
// public/covers/. This file reads the size of each cover when the site is built
// (it has no 'use client', so it never runs in the browser) and hands the list to
// ./_components/BookShelf.tsx, which draws the covers and the enlarged view.
import fs from 'fs'
import path from 'path'
import sizeOf from 'image-size'

import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import TextHeading from '@/components/ui/text-heading/text-heading'
import SectionHeading from '@/components/ui/text-heading/section-heading'
import { BookOpen, NotebookPen } from 'lucide-react'
import { SectionFooter } from '@/components/layout/footer/SectionFooter'
import Text from '@/components/ui/text/text'
import { TerminalNav } from '@/components/ui/terminal-nav/terminal-nav'
import Link from 'next/link'
import { books } from './_data/books'
import { BookShelf, ShelfBook } from './_components/BookShelf'

/** The Reading page: the introduction, the Marginalia section and the books. */
export default function Reading() {
    // Add the size of each cover in pixels, read from its file (`...book` copies
    // the book's own fields). If a file cannot be read, the cover gets the 2:3
    // shape of a typical book, and the problem is reported in the terminal.
    const shelf: ShelfBook[] = books.map((book) => {
        try {
            const file = fs.readFileSync(path.join(process.cwd(), 'public', book.cover))
            const { width, height } = sizeOf(file)
            return { ...book, width: width ?? 400, height: height ?? 600 }
        } catch (error) {
            console.error(`Could not read the cover ${book.cover}:`, error)
            return { ...book, width: 400, height: 600 }
        }
    })

    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                <TerminalNav />

                {/* Header Content */}
                <div>
                    <TextHeading as="h1" weight="bold" className="mb-2">
                        Reading
                    </TextHeading>

                    <Text variant="faint" size="smaller" className="mb-12">
                        Notes on things I've read, links to pieces I love, plus the books I'm trying
                        to get through.
                    </Text>

                    {/* Marginalia Section Header */}
                    <div className="mb-12">
                        <SectionHeading icon={NotebookPen}>Marginalia</SectionHeading>

                        <Text variant="muted" size="smaller">
                            Excerpts, takeaways and collections of short-form writing that left an
                            impression. You can browse the collection{' '}
                            <Link
                                href="/reading/marginalia"
                                className="text-accent font-bold hover:underline"
                            >
                                here
                            </Link>
                            .
                        </Text>
                    </div>

                    {/* Heading before the covers */}
                    <SectionHeading icon={BookOpen}>Currently Reading</SectionHeading>

                    {/* Combined Text */}
                    <Text variant="muted" size="smaller" className="mb-8">
                        Books that I am currently reading (or, at least, trying to). A simulacrum of
                        (a fragment of) my library can be found{' '}
                        <Link
                            href="https://hobby-site.vercel.app/"
                            className="text-accent font-bold hover:underline"
                        >
                            here
                        </Link>
                        .
                    </Text>

                    {/* The covers; clicking one shows the book's details */}
                    <div className="mb-8">
                        <BookShelf books={shelf} />
                    </div>
                </div>
            </StackVertical>
            <SectionFooter showToTop={false} />
        </BaseContainer>
    )
}
