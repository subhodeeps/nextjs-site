// src/app/learning/books/page.tsx
//
// The page at /learning/books: the books with notes. Each book is one <Text> with
// a <Link> to its page; copy one to add a book.
'use client'

import BaseContainer from "@/components/layout/container/base-container"
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import TextHeading from "@/components/ui/text-heading/text-heading"
import Text from "@/components/ui/text/text"
import { TerminalNav } from "@/components/ui/terminal-nav/terminal-nav"
import { IndividualPageFooter } from "@/components/layout/footer/IndividualPageFooter"
import Link from "next/link"

/** The Books page: the list of books, a note that it is under construction, and the footer. */
export default function Books() {
    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                <TerminalNav />

                <div>
                <TextHeading as="h1" weight="bold">
                    Books
                </TextHeading>
                    <Text variant="muted" className="mb-8">
                        A collection of books I've read and taken notes on.
                    </Text>

                <StackVertical gap="md">
                    <Text className="underline font-bold hover:text-accent">
                        <Link href="/learning/books/scattering-from-black-holes/">Scattering from black holes by Futterman, Handler and Matzner</Link>
                    </Text>
                    <Text variant = 'red'>
                        ^The pages within this section are currently under construction.
                    </Text>
                </StackVertical>
            </div>

            </StackVertical>

            <IndividualPageFooter sectionName={`Learning`} showToTop={false} />

        </BaseContainer>
    )
}

