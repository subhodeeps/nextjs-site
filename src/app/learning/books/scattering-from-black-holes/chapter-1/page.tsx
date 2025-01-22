'use client'

import Notes from './notes.mdx'
import { mdxComponents } from '@/lib/mdx/mdx-components'
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import { DynamicBreadcrumb } from '@/components/ui/primitives/breadcrumb'
import { ThemeToggle } from '@/components/ui/theme/theme-toggle'
import { IndividualPageFooter } from '@/components/layout/footer/IndividualPageFooter'

export default function Chapter1() {
  return (
    <>
      <BaseContainer size="md" paddingX="md" paddingY="lg">
        <StackVertical gap="md">
          {/* Breadcrumb */}
          <div className="flex items-center justify-between">
            <DynamicBreadcrumb 
              items={[
                { href: '/', label: 'Home', emoji: '👾' },
                { href: '/learning', label: 'Learning' },
                { href: '/learning/books', label: 'STEM Books' },
                { href: '/notes/books/scattering-from-black-holes', label: 'Scattering from Black Holes by Futterman' },
                { label: 'Chapter 1' }
              ]}
            />
            <ThemeToggle />
          </div>

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
