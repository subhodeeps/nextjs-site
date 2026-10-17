// src/app/page.tsx
//
// The home page, served at /, like index.md at the root of a Jekyll site. Its
// content lives in src/components/blocks/homepage/Homepage.tsx.
import { Homepage } from '@/components/blocks/homepage/Homepage'

/** The page component for /. Next.js renders whatever it returns. */
export default function Home() {
  return <Homepage />
}
