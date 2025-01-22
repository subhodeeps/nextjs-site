'use client'

import { IndividualPageFooter } from "@/components/layout/footer/IndividualPageFooter"
import Text from "@/components/ui/text/text"
import TextHeading from "@/components/ui/text-heading/text-heading"
import BaseContainer from "@/components/layout/container/base-container"
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"

import { List, ListItem } from "@/components/ui/list/list"

import Callout from "@/components/blocks/callout/callout"
import Ruler from "@/components/ui/ruler/ruler"
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import Link from "next/link"
import { SECTION_IDS } from "./section-ids"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"

export default function GettingStartedWithMLPost() {
  return (
    <>
      <BaseContainer size="md" paddingX="md" paddingY="lg">
        <StackVertical gap="md">
          <div className="flex items-center justify-between">
            <DynamicBreadcrumb 
                items={[
                    { href: '/', label: 'Home', emoji: '👾' },
                    { href: '/blog', label: 'Blog' },
                    { label: 'Dummy Post' }
                ]} 
            />
            <ThemeToggle />
          </div>


          <article id={SECTION_IDS.ARTICLE_CONTENT}>

            <TextHeading as="h1">Dummy Post</TextHeading>
            <Text variant="muted" size="xs" className="mb-8">January 22, 2025 | 10 min read</Text>

              <section>
                <StackVertical gap="md">
                  <Text><u><strong>Disclaimer</strong></u>: I am not an expert; I'm a learner, and I've just outlined what has worked for me and although I have tried making it more general, this could still, to some extent, be a subjective list.</Text>
                  
                  <Text weight="bold">This list assumes the following:</Text>
                  <List marker='decimal' spacing='relaxed'>
                      <ListItem>that you have no prior background when it comes to machine learning</ListItem>
                      <ListItem>that you have completed high school math (maybe you've forgotten, but that's okay)</ListItem>
                      <ListItem>that you don't know much about Python but aren't too unfamiliar with programming languages. If you know some Python, awesome. If you're an expert, even better. If you know another programming language, that'll help a lot! You more or less know where you fit here so move forward accordingly; let's assume that you are a beginner in Python (or programming in general).</ListItem>
                    </List>
                  
                  <Text>There's no particular order to this, and the resources I suggest could be subjective. As a learner, you're free to roam around, but having some basic foundation when it comes to math & programming (Python) is key.</Text>
                  
                  
                  <Text>
                    Good luck!
                  </Text>
                </StackVertical>
              </section>
          </article>
        </StackVertical>
      </BaseContainer>

      <IndividualPageFooter sectionName="Blog" />
    </>
  )
}
