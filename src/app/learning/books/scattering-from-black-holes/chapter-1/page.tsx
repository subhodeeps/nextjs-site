'use client'

import Notes from './notes.mdx'
import { mdxComponents } from '@/lib/mdx/mdx-components'
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import { TerminalNav } from '@/components/ui/terminal-nav/terminal-nav'
import { IndividualPageFooter } from '@/components/layout/footer/IndividualPageFooter'

export default function Chapter1() {
  return (
    <>
      <BaseContainer size="md" paddingX="md" paddingY="lg">
        <StackVertical gap="md">
          <TerminalNav />

          {/* MDX Content */}
          <div className="prose dark:prose-invert max-w-none">
            <Notes components={mdxComponents} />
          </div>
        </StackVertical>
      </BaseContainer>

      <IndividualPageFooter parentPageName='BH Scattering Book' showToTop={false}/>
    </>
  )
}
