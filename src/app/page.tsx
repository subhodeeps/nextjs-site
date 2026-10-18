// src/app/page.tsx
//
// The home page, served at /, like index.md at the root of a Jekyll site. Its
// layout lives in src/components/blocks/homepage/Homepage.tsx. This file reads
// the text from src/content (bio.md, updates.md, and socials.md) when the site
// is built (it has no 'use client', so it never runs in the browser) and hands
// it to the page.
import { Homepage } from '@/components/blocks/homepage/Homepage'
import { getBio, getSocials } from '@/lib/homepage/homepage'
import { getHomepageUpdates } from '@/lib/updates/updates'

/** The page component for /. Next.js renders whatever it returns. */
export default function Home() {
    const { updates, hasOlder } = getHomepageUpdates()
    return <Homepage bio={getBio()} updates={updates} hasOlder={hasOlder} socials={getSocials()} />
}
