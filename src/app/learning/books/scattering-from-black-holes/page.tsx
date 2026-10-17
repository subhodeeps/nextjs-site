'use client'

import BaseContainer from "@/components/layout/container/base-container";
import { TerminalNav } from "@/components/ui/terminal-nav/terminal-nav";
import { IndividualPageFooter } from "@/components/layout/footer/IndividualPageFooter";
import { StackVertical } from "@/components/layout/layout-stack/layout-stack";
import Ruler from "@/components/ui/ruler/ruler";
import TextHeading from "@/components/ui/text-heading/text-heading";
import Text from "@/components/ui/text/text";
import Link from "next/link";

export default function LLMFromScratchRaschka() {

    return (
        <>
        <BaseContainer size="md" paddingX="md" paddingY="lg">
        <StackVertical gap="md">
          <TerminalNav />

        <article>
            <TextHeading as="h1">Scattering From Black Holes</TextHeading>
            <Text variant='muted' size='xs' className="mb-8">Last updated: December 31, 2024</Text>
            <StackVertical gap="md">
                
                <Text variant='red'>
                    The page is currently under construction. Every chapter link below is a placeholder.
                </Text>

               

                <Ruler color='colorless' marginTop='sm' marginBottom='none'/>

                <Text className="hover:underline"><Link href={`/learning/books/scattering-from-black-holes/chapter-1`}>Chapter 1 Notes</Link></Text>
               
            </StackVertical>
            </article>
        </StackVertical>
        </BaseContainer>
        <IndividualPageFooter sectionName={`Notes`} showToTop={false} />
        </>
    )
}