"use client";

import BaseContainer from "@/components/layout/container/base-container";
import { StackVertical } from "@/components/layout/layout-stack/layout-stack";
import TextHeading from "@/components/ui/text-heading/text-heading";
import { SectionFooter } from "@/components/layout/footer/SectionFooter";
import Text from "@/components/ui/text/text";
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import Link from "next/link";

export default function About() {
  return (
    <BaseContainer size="md" paddingX="md" paddingY="lg">
      <StackVertical gap="md">
        <div className="flex items-center justify-between">
          <DynamicBreadcrumb
            items={[
              { href: "/", label: "Home", emoji: "👾" },
              { label: "About" },
            ]}
          />
          <ThemeToggle />
        </div>

        <div>
          <TextHeading as="h1" weight="bold">
            In the time of chimpanzees, I was a monkey...
          </TextHeading>
          <Text variant="muted" size="xs" className="mb-8">
            January 29, 2025
          </Text>

          <div className="flow-root">
            <div className="float-left mr-6 mb-4 w-48 md:w-64">
              <img
                src="/photo.jpg"
                alt="Profile photo"
                className="rounded-lg w-full h-auto mb-2"
              />
              <Text size="xs" variant="muted" className="text-center">
                Selfie with{" "}
                <Link
                  href="https://en.wikipedia.org/wiki/Chaukhamba"
                  className="text-purple-500 font-bold hover:underline"
                >
                  Chaukhamba{" "}
                </Link>{" "}
                @{" "}
                <Link
                  href="https://en.wikipedia.org/wiki/Deoria_Tal"
                  className="text-purple-500 font-bold hover:underline"
                >
                  Deoria Tal
                </Link>
                , Jan 2024.
              </Text>
            </div>

            <div className="space-y-8">
              <Text>
                Hey! I'm Subhodeep, a postdoctoral researcher at the Indian
                Institute of Technology Gandhinagar. Earlier, I was a postdoc at
                IIT Madras. My research focuses on strong-field probes of
                general relativity. I use black hole perturbation theory and
                numerical relativity to study gravitational collapse,
                quasinormal modes, late-time dynamics, and ringdown physics.
              </Text>
              <Text>
                More broadly, I use theoretical and computational methods to
                understand how gravity behaves in extreme regions of spacetime,
                particularly in the vicinity of black holes and exotic compact
                objects. Much of this work is motivated by the prospect of using
                gravitational waves to address fundamental questions in physics.
              </Text>
              <Text>
                I am also interested in understanding the optical appearance of
                compact objects through gravitational lensing and black hole
                shadows, and the motion of particles around them. These can
                provide complementary and potentially observable probes of
                strong-field gravity. Together with gravitational waves, they
                may help constrain deviations from general relativity. To learn
                more about my work, please check out my{" "}
                <Link
                  href="/research"
                  className="text-purple-500 font-bold hover:underline"
                >
                  publications
                </Link>
                .
              </Text>
              <Text>
                Besides my primary research, my interests also include dynamical
                systems and machine learning in physics. Alongside research, I
                enjoy teaching physics, mathematics, and programming. I have
                previously assisted my mentors in teaching courses like
                numerical methods and computational physics, biostatistics,
                Python programming, and classical and quantum mechanics.
              </Text>
              <Text>
                I defended my Ph.D. thesis at the Indian Institute of
                Information Technology Allahabad in 2019, where I was mentored
                by Srijit Bhattacharjee. Following my doctoral studies, I was a
                Research Fellow at the Centre for Theoretical Physics, Jamia
                Millia Islamia, and worked closely with Anjan Ananda Sen. I then
                joined IIT Madras, where I worked with Dawood Kothawala. At IIT
                Gandhinagar, I work with Sudipta Sarkar. I also collaborate
                closely with Sumanta Chakraborty at IACS, Kolkata. You can find
                more about my collaborators and co-authors on my{" "}
                <Link
                  href="/research"
                  className="text-purple-500 font-bold hover:underline"
                >
                  collaborators and co-authors
                </Link>{" "}
                page.
              </Text>
              <Text>
                I enjoy interacting and collaborating with new people, and I am
                always open to conversations on the topics mentioned above. Feel
                free to drop a line if you would like to exchange ideas, discuss
                physics, or explore important questions, such as which of us
                would want to strangle the other first while writing a paper
                together.
              </Text>
            </div>
            
          </div>
        </div>
      </StackVertical>
      <SectionFooter color="purple" />
    </BaseContainer>
  );
}
