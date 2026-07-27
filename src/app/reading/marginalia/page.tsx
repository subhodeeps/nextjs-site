'use client'

import BaseContainer from "@/components/layout/container/base-container"
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import TextHeading from "@/components/ui/text-heading/text-heading"
import { SectionFooter } from "@/components/layout/footer/SectionFooter"
import Text from "@/components/ui/text/text"
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import { notes } from "../_data/posts" 
import { ReferenceCard } from "../_components/ReferenceCard" 

export default function MarginaliaPage() {
    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                {/* Breadcrumb linking back to Reading */}
                <div className="flex items-center justify-between">
                    <DynamicBreadcrumb 
                        items={[
                            { href: '/', label: 'Home', emoji: '👾' },
                            { href: '/reading', label: 'Reading' },
                            { label: 'Marginalia' }
                        ]}
                    />
                    <ThemeToggle />
                </div>

                <div>
                    <TextHeading as="h1" weight="bold" className="mb-2">
                        Marginalia
                    </TextHeading>
                    
                    <Text variant="muted" className="mb-12">
                        Excerpts, takeaways and collections of short-form writing that left an impression.
                    </Text>

                    {/* Stacked Display of Notes */}
                    <StackVertical gap="none" className="mb-12">
                        {notes.map((note, index) => (
                            <ReferenceCard
                                key={note.id}
                                post={note}
                                isLast={index === notes.length - 1}
                            />
                        ))}
                    </StackVertical>
                </div>

            </StackVertical>
            <SectionFooter color="purple" showToTop={true} />
        </BaseContainer>
    )
}