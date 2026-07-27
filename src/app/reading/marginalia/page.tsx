'use client'

import BaseContainer from "@/components/layout/container/base-container"
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import TextHeading from "@/components/ui/text-heading/text-heading"
import { SectionFooter } from "@/components/layout/footer/SectionFooter"
import Text from "@/components/ui/text/text"
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import Link from "next/link"

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

            
                <StackVertical gap="none" className="mb-12">
                    <ul className="list-disc pl-5 marker:text-muted-foreground">
                        
                        {/* Calvino */}
                        <li className="pl-2 mb-4">
                            <Text>
                                <Link 
                                    href="https://app.box.com/s/6ptwjwfgf13jni7qcnynwi2irvfa31d7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline decoration-purple-500 decoration-1 underline-offset-4 hover:text-purple-400 transition-colors"
                                >
                                    Why Read the Classics?
                                </Link>
                                {" "}Italo Calvino (translated by Martin McLaughlin), 1991.
                            </Text>
                        </li>

                        {/* McEwan */}
                        <li className="pl-2 mb-4">
                            <Text>
                                <Link 
                                    href="https://app.box.com/s/ks1vlfuhd7bk3jopwgql3s8mk1vljmih"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline decoration-purple-500 decoration-1 underline-offset-4 hover:text-purple-400 transition-colors"
                                >
                                    Düssel…
                                </Link>
                                {" "}Ian McEwan. A story, July 19, 2018 issue,{" "}
                                <Link 
                                    href="https://www.nybooks.com/articles/2018/07/19/dussel/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline decoration-purple-500 decoration-1 underline-offset-4 hover:text-purple-400 transition-colors"
                                >
                                    New York Review of Books
                                </Link>.
                            </Text>
                        </li>

                    </ul>
                </StackVertical>
                </div>

            </StackVertical>
            <SectionFooter color="purple" showToTop={true} />
        </BaseContainer>
    )
}