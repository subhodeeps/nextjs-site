'use client'

import BaseContainer from "@/components/layout/container/base-container";
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb";
import { IndividualPageFooter } from "@/components/layout/footer/IndividualPageFooter";
import { StackVertical } from "@/components/layout/layout-stack/layout-stack";
import Ruler from "@/components/ui/ruler/ruler";
import TextHeading from "@/components/ui/text-heading/text-heading";
import Text from "@/components/ui/text/text";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import Link from "next/link";

export default function LLMFromScratchRaschka() {

    return (
        <>
        <BaseContainer size="md" paddingX="md" paddingY="lg">
        <StackVertical gap="md">
          <div className="flex items-center justify-between">
            <DynamicBreadcrumb 
                items={[
                    { href: '/', label: 'Home', emoji: '👾' },
                    { href: '/learning', label: 'Learning' },
                    { href: '/learning/books', label: 'STEM Books' },
                    { label: 'Scattering From Black Holes' }
                ]} 
            />
            <ThemeToggle />
          </div>

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