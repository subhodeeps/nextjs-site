'use client'

import BaseContainer from "@/components/layout/container/base-container"
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import TextHeading from "@/components/ui/text-heading/text-heading"
import { SectionFooter } from "@/components/layout/footer/SectionFooter"
import Text from "@/components/ui/text/text"
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import Link from "next/link"
import Ruler from "@/components/ui/ruler/ruler"

export default function Learning() {
    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">

                {/* Breadcrumb */}
                <div className="flex items-center justify-between">
                    <DynamicBreadcrumb
                        items={[
                            { href: "/", label: "Home", emoji: "👾" },
                            { label: "Research" }
                        ]}
                    />
                    <ThemeToggle />
                </div>

                {/* Header */}
                <div>
                    <TextHeading as="h1" weight="bold">
                        Research and Publications
                    </TextHeading>

                    <Text variant="muted" className="mb-8">
                        My research interests include various aspects of gravitation and black hole physics. Broadly
                        speaking, I use theoretical and computational tools to explore classical and quantum aspects of
                        black holes, aiming to better understand how gravity behaves in extreme regimes. I am
                        particularly interested in black hole perturbation theory and questions related to the stability
                        of the quasinormal mode spectrum of black holes. I’m also interested in the prospect of doing
                        fundamental physics with gravitational waves. Beyond black holes and general relativity, I’m
                        keenly interested in exploring dynamical systems, and the application of machine learning
                        techniques in physics and vice versa.
                    </Text>

                    <TextHeading as="h2" weight="bold">
                        Preprints
                    </TextHeading>

                    <StackVertical gap="md">

                        <Text className="font-bold hover:text-purple-500">
                            <Link
                                href="https://inspirehep.net/literature/3084799"
                                className="text-purple-500 font-bold hover:underline"
                            >
                                The Physics of Black Holes and Their Environments: Consequences for Gravitational Wave Science
                            </Link>
                            <br />
                                Vitor Cardoso, Shauvik Biswas, Subhodeep Sarkar
                            <br />
                                arXiv:2511.14841 [gr-qc]
                        </Text>
                    </StackVertical>

                    <TextHeading as="h2" weight="bold">
                        Published Papers
                    </TextHeading>

                    <StackVertical gap="md">

                        <Text className="font-bold hover:text-purple-500">
                            <Link
                                href="https://inspirehep.net/literature/2735894"
                                className="text-purple-500 font-bold hover:underline"
                            >
                                Gravitational atoms in the braneworld scenario
                            </Link>
                            <br />
                            Sunil Singh Bohra, Subhodeep Sarkar, and Anjan Ananda Sen
                            <br />
                            Phys. Rev. D 2024.
                        </Text>

                        <Text className="font-bold hover:text-purple-500">
                            <Link
                                href="https://inspirehep.net/literature/2651487"
                                className="text-purple-500 font-bold hover:underline"
                            >
                                Perturbing the perturbed: Stability of quasinormal modes in presence of a positive
                                cosmological constant
                            </Link>
                            <br />
                            Subhodeep Sarkar, Mostafizur Rahman, and Sumanta Chakraborty
                            <br />
                            Phys. Rev. D 2023.
                        </Text>

                        <Text className="font-bold hover:text-purple-500">
                            <Link
                                href="https://inspirehep.net/literature/1940051"
                                className="text-purple-500 font-bold hover:underline"
                            >
                                Can we detect a supertranslated black hole?
                            </Link>
                            <br />
                            Subhodeep Sarkar, Shailesh Kumar, and Srijit Bhattacharjee
                            <br />
                            Phys. Rev. D 2022.
                        </Text>

                        <Text className="font-bold hover:text-purple-500">
                            <Link
                                href="https://inspirehep.net/literature/1830603"
                                className="text-purple-500 font-bold hover:underline"
                            >
                                Scalar perturbations of black holes in Jackiw-Teitelboim gravity
                            </Link>
                            <br />
                            Srijit Bhattacharjee, Subhodeep Sarkar, and Arpan Bhattacharyya
                            <br />
                            Phys. Rev. D 2021.
                        </Text>

                        <Text className="font-bold hover:text-purple-500">
                            <Link
                                href="https://inspirehep.net/literature/1797104"
                                className="text-purple-500 font-bold hover:underline"
                            >
                                Mass inflation and strong cosmic censorship in a nonextreme BTZ black hole
                            </Link>
                            <br />
                            Srijit Bhattacharjee, Shailesh Kumar, and Subhodeep Sarkar
                            <br />
                            Phys. Rev. D 2020.
                        </Text>

                    </StackVertical>
                </div>
            </StackVertical>

            <Ruler color="colorless" marginTop="lg" marginBottom="none" />

            <Text variant="muted" className="mb-8">
                Please visit my{" "}
                <Link
                    href="https://inspirehep.net/authors/1797180?ui-citation-summary=true"
                    className="text-purple-500 font-bold hover:underline"
                >
                    INSPIRE-HEP profile
                </Link>{" "}
                for bibliometrics and a possibly updated list of papers.
            </Text>

            <SectionFooter color="purple" showToTop={false} />
        </BaseContainer>
    )
}


// 'use client'

// import BaseContainer from "@/components/layout/container/base-container"
// import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
// import TextHeading from "@/components/ui/text-heading/text-heading"
// import { SectionFooter } from "@/components/layout/footer/SectionFooter"
// import Text from "@/components/ui/text/text"
// import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
// import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
// import Link from "next/link"
// import Ruler from '@/components/ui/ruler/ruler'

// export default function Learning() {
//     return (
//         <BaseContainer size="md" paddingX="md" paddingY="lg">
//             <StackVertical gap="md">
//                 {/* Breadcrumb */}
//                 <div className="flex items-center justify-between">
//                     <DynamicBreadcrumb
//                         items={[
//                             { href: '/', label: 'Home', emoji: '👾' },
//                             { label: 'Research' }
//                         ]}
//                     />
//                     <ThemeToggle />
//                 </div>

//                 {/* Header Content */}
//                 <div>
//                     <TextHeading as="h1" weight="bold">
//                         Research and Publications
//                     </TextHeading>
//                     <Text variant="muted" className="mb-8">
//                         My research interests include various aspects of gravitation and black hole physics. Broadly speaking, I use theoretical and computational tools to explore classical and quantum aspects of black holes, aiming to better understand how gravity behaves in extreme regimes. I am particularly interested in black hole perturbation theory and questions related to the stability of the quasinormal mode spectrum of black holes. I’m also interested in the prospect of doing fundamental physics with gravitational waves. Beyond black holes and general relativity, I’m keenly interested in exploring dynamical systems, and the application of machine learning techniques in physics and vice versa.
//                     </Text>

//                     <TextHeading as="h2" weight="bold">
//                         Published Papers
//                     </TextHeading>

//                     <StackVertical gap="md">



//                         <Text className="font-bold hover:text-purple-500">
//                             <Link href="https://inspirehep.net/literature/2735894" className="text-purple-500 font-bold hover:underline">Gravitational atoms in the braneworld scenario </Link><br />Sunil Singh Bohra, Subhodeep Sarkar, and Anjan Ananda Sen<br />Phys. Rev. D 2024.
//                         </Text>
//                         <Text className="font-bold hover:text-purple-500">
//                             <Link href="https://inspirehep.net/literature/2651487" className="text-purple-500 font-bold hover:underline">Perturbing the perturbed: Stability of quasinormal modes in presence of a positive cosmological constant</Link><br />Subhodeep Sarkar, Mostafizur Rahman, and Sumanta Chakraborty<br />Phys. Rev. D 2023.
//                         </Text>
//                         <Text className="font-bold hover:text-purple-500">
//                             <Link href="https://inspirehep.net/literature/1940051" className="text-purple-500 font-bold hover:underline">Can we detect a supertranslated black hole?</Link><br />Subhodeep Sarkar, Shailesh Kumar, and Srijit Bhattacharjee<br />Phys. Rev. D 2022.
//                         </Text>
//                         <Text className="font-bold hover:text-purple-500">
//                             <Link href="https://inspirehep.net/literature/1830603" className="text-purple-500 font-bold hover:underline">Scalar perturbations of black holes in Jackiw-Teitelboim gravity</Link><br />Srijit Bhattacharjee, Subhodeep Sarkar, and Arpan Bhattacharyya<br />Phys. Rev. D 2021.
//                         </Text>
//                         <Text className="font-bold hover:text-purple-500">
//                             <Link href="https://inspirehep.net/literature/1797104" className="text-purple-500 font-bold hover:underline">Mass inflation and strong cosmic censorship in a nonextreme BTZ black hole</Link><br />Srijit Bhattacharjee, Shailesh Kumar, and Subhodeep Sarkar<br />Phys. Rev. D 2020.
//                         </Text>


//                     </StackVertical>
//                 </div>
//             </StackVertical>

//              <Ruler color='colorless' marginTop='lg' marginBottom='none'/>
//             <Text variant="muted" className="mb-8">
//                 Please visit my <Link href="https://inspirehep.net/authors/1797180?ui-citation-summary=true" className="text-purple-500 font-bold hover:underline">INSPIRE-HEP profile </Link> for bibliometrics and a possibly updated list of papers.
//             </Text>
//             <SectionFooter color="purple" showToTop={false} />
//         </BaseContainer>
//     )
// }