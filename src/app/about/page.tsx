'use client'

import BaseContainer from "@/components/layout/container/base-container"
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import TextHeading from "@/components/ui/text-heading/text-heading"
import { SectionFooter } from "@/components/layout/footer/SectionFooter"
import Text from "@/components/ui/text/text"
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import Link from 'next/link'

export default function About() {
    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                <div className="flex items-center justify-between">
                    <DynamicBreadcrumb 
                        items={[
                            { href: '/', label: 'Home', emoji: '👾' },
                            { label: 'About' }
                        ]}
                    />
                    <ThemeToggle />
                </div>

                <div>
                    <TextHeading as="h1" weight="bold">
                        In the time of chimpanzees, I was a monkey...
                    </TextHeading>
                    <Text variant="muted" size="xs" className="mb-8">January 29, 2025</Text>
                    
                    <div className="flow-root">
                        <div className="float-left mr-6 mb-4 w-48 md:w-64">
                            <img
                                src="/photo.jpg"
                                alt="Profile photo"
                                className="rounded-lg w-full h-auto mb-2"
                            />
                            <Text size="xs" variant="muted" className="text-center">
                                Selfie with  <Link href="https://en.wikipedia.org/wiki/Chaukhamba" className="text-purple-500 font-bold hover:underline">Chaukhamba </Link> @ <Link href="https://en.wikipedia.org/wiki/Deoria_Tal" className="text-purple-500 font-bold hover:underline">Deoria Tal</Link>, Jan 2024.
                            </Text>
                        </div>
                        
                        <div className="space-y-8">
                            <Text>
                                Hey! I'm Subhodeep, a postdoctoral researcher at the Indian Institute of Technology, Madras. Formally, I am attached to the Department of Physics and the Centre for Strings, Gravitation and Cosmology at IIT Madras. My research interests include various aspects of gravitation and black hole physics, focusing on the internal structure of black holes, quasinormal modes, gravitational lensing, and black hole shadows. Broadly speaking, I use theoretical and computational tools to explore classical and quantum aspects of black holes, aiming to better understand how gravity behaves in extreme regimes. I’m also interested in the prospect of doing fundamental physics with gravitational waves. To learn more about my work, please check out my {' '}<Link href="/research" className="text-purple-500 font-bold hover:underline">publications</Link>. 
                            </Text>
                            <Text>
                                I have recently defended my Ph.D. thesis at the Indian Institute of Information Technology, Allahabad where I worked under the supervision of Dr. Srijit Bhattacharjee. I have also served as a research fellow at the Centre for Theoretical Physics, Jamia Millia Islamia under Prof. Anjan Ananda Sen. At, IIT Madras, I work principally with Dr. Dawood Kothawala.
                            </Text>
                            <Text>
                                Beyond black holes and general relativity, I'm keenly interested in exploring dynamical systems, and the application of machine learning techniques in physics and vice versa. I also take pleasure in teaching physics, mathematics, and programming. In the past, I have actively assisted my supervisor in teaching a diverse range of subjects such as numerical methods and computational physics, biostatistics, Python programming, and classical and quantum mechanics.
                            </Text>
                            <Text>
                                I also enjoy meeting and collaborating with new people. So, please feel free to get in touch if you'd like to discuss and study some of the broad topics I've mentioned here!
                            </Text>
                        </div>
                    </div>
                </div>
            </StackVertical>
            <SectionFooter color="purple" />
        </BaseContainer>
    )
}