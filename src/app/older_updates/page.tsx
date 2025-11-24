'use client'

import BaseContainer from "@/components/layout/container/base-container"
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import TextHeading from "@/components/ui/text-heading/text-heading"
import Text from "@/components/ui/text/text"
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import { SectionFooter } from "@/components/layout/footer/SectionFooter"
import Link from "next/link"
import { motion } from 'framer-motion'
import { BookOpen, Briefcase, Video, GraduationCap, FileText } from 'lucide-react'

const WorkItem = ({ icon, text, delay }: { icon: React.ReactNode; text: React.ReactNode; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex items-center gap-4 mb-4"
  >
    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
      {icon}
    </div>
    <div className="flex-1">{text}</div>
  </motion.div>
)

export default function OlderUpdates() {
  const items = [

     {
      icon: <BookOpen className="w-4 h-4" />,
      text: (
        <a
          href="https://doi.org/10.1103/PhysRevD.109.104021"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-500 hover:underline"
        >
          [07 May 2024] Published in PRD: Gravitational atoms in the braneworld
          scenario.
        </a>
      ),
    },

    {
      icon: <Briefcase className="w-4 h-4" />,
      text: "[01 Apr 2024] Joined the CSGC-IITM as a postdoctoral fellow.",
    },


    {
      icon: <FileText className="w-4 h-4" />,
      text: (
        <a href="https://doi.org/10.48550/arXiv.2312.07295" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
          [13 Dec 2023] Preprint: Gravitational atoms in the braneworld scenario.
        </a>
      )
    },
    {
      icon: <BookOpen className="w-4 h-4" />,
      text: (
        <a href="https://doi.org/10.1103/PhysRevD.108.104002" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
          [01 Nov 2023] Published in PRD: Perturbing the perturbed: Stability of quasinormal modes in presence of a positive cosmological constant.
        </a>
      )
    },
    {
      icon: <FileText className="w-4 h-4" />,
      text: (
        <a href="https://arxiv.org/abs/2304.06829" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
          [13 Apr 2023] Preprint: Perturbing the perturbed: Stability of quasinormal modes in presence of a positive cosmological constant.
        </a>
      )
    },
    {
      icon: <Briefcase className="w-4 h-4" />,
      text: (
        <a href="https://www.ctp-jamia.res.in/" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
          [08 Feb 2023] Joined CTP-JMI as Project Fellow under Prof. Anjan Ananda Sen
        </a>
      )
    },
    {
      icon: <BookOpen className="w-4 h-4" />,
      text: (
        <a href="https://doi.org/10.1103/PhysRevD.105.084001" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
          [04 Apr 2022] Published in PRD: Can we detect a supertranslated black hole?
        </a>
      )
    },
    {
      icon: <Video className="w-4 h-4" />,
      text: (
        <a href="https://www.youtube.com/watch?v=2VA1N6MXTb8" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
          [11 Mar 2022] Talk at IIT-GN: Testing the Strong Cosmic Censorship Conjecture
        </a>
      )
    },
    {
      icon: <BookOpen className="w-4 h-4" />,
      text: (
        <a href="https://doi.org/10.1103/PhysRevD.103.024008" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
          [05 Jan 2021] Published in PRD: Scalar perturbations of black holes in Jackiw-Teitelboim gravity
        </a>
      )
    },
    {
      icon: <FileText className="w-4 h-4" />,
      text: (
        <a href="https://arxiv.org/abs/2011.08179" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
          [18 Nov 2020] Preprint: Scalar perturbations of black holes in JT gravity
        </a>
      )
    },
    {
      icon: <BookOpen className="w-4 h-4" />,
      text: (
        <a href="https://doi.org/10.1103/PhysRevD.102.044030" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
          [17 Aug 2020] Published in PRD: Mass inflation and strong cosmic censorship in BTZ black hole
        </a>
      )
    },
    {
      icon: <FileText className="w-4 h-4" />,
      text: (
        <a href="https://arxiv.org/abs/2005.09705" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
          [21 May 2020] Preprint: Mass inflation and strong cosmic censorship in BTZ black hole
        </a>
      )
    }
  ]

  return (
    <BaseContainer size="md" paddingX="md" paddingY="lg">
      <StackVertical gap="md">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between">
          <DynamicBreadcrumb 
            items={[
              { href: '/', label: 'Home', emoji: '👾' },
              { label: 'older_updates' }
            ]}
          />
          <ThemeToggle />
        </div>

        {/* Header Content */}
        <div>
          <TextHeading as="h1" weight="bold">
            Older Updates
          </TextHeading>
          <Text variant="muted" className="mb-8">
            Archive of my past updates and activities
          </Text>

          <StackVertical gap="md">
            {items.map((item, index) => (
              <WorkItem 
                key={index}
                icon={item.icon}
                text={item.text}
                delay={index * 0.1}
              />
            ))}
          </StackVertical>
        </div>
      </StackVertical>
      
      <SectionFooter color="purple" showToTop={false} />
    </BaseContainer>
  )
}