// src/app/collaborators/page.tsx
import fs from 'fs'
import path from 'path'
import sizeOf from 'image-size'

import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import TextHeading from '@/components/ui/text-heading/text-heading'
import { SectionFooter } from '@/components/layout/footer/SectionFooter'
import Text from '@/components/ui/text/text'
import { DynamicBreadcrumb } from '@/components/ui/primitives/breadcrumb'
import { ThemeToggle } from '@/components/ui/theme/theme-toggle'

// Import the new client component
import CollaboratorGrid from './grid'

type CollaboratorPhoto = {
  id: string
  name: string
  photoUrl: string
  width: number
  height: number
}

export default function Collaborators() {
  const photosDirectory = path.join(process.cwd(), 'public', 'collabs')
  let people: CollaboratorPhoto[] = []

  try {
    const files = fs.readdirSync(photosDirectory)

    // Read the files statically at build time (no shuffling here)
    people = files
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map((file, index) => {
        const filepath = path.join(photosDirectory, file)
        const imageBuffer = fs.readFileSync(filepath)
        const dimensions = sizeOf(imageBuffer)

        const nameWithoutExt = file.replace(/\.[^/.]+$/, '')

        return {
          id: String(index),
          name: nameWithoutExt.replace(/[_-]/g, ' '),
          photoUrl: `/collabs/${file}`,
          width: dimensions.width ?? 1200,
          height: dimensions.height ?? 1200,
        }
      })
  } catch (error) {
    console.error('Failed to read collabs directory:', error)
  }

  return (
    <BaseContainer size="md" paddingX="md" paddingY="lg">
      <StackVertical gap="md">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between">
          <DynamicBreadcrumb
            items={[
              { href: '/', label: 'Home', emoji: '👾' },
              { label: 'Collaborators' },
            ]}
          />
          <ThemeToggle />
        </div>

        {/* Header */}
        <div>
          <TextHeading as="h1" weight="bold">
            Collaborations (or, The Real MVPs)
          </TextHeading>

          <Text variant="muted" className="mb-10">
            Research is rarely a solitary endeavor. I have been incredibly fortunate to collaborate and regularly interact with many amazing individuals whose insight, work ethic, generosity, and enthusiasm for physics have profoundly influenced my own approach to research. This page contains photographs of some of the people with whom I have worked, from whom I have learned, and with whom I have exchanged ideas. It is necessarily incomplete, and I hope it remains that way for as long as I'm in the business.
          </Text>

          {/* Pass the static data into the Client Component to handle the random shuffle */}
          <CollaboratorGrid initialPeople={people} />
          
        </div>
      </StackVertical>

      <SectionFooter color="purple" showToTop={false} />
    </BaseContainer>
  )
}