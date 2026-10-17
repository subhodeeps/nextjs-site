// src/app/page.tsx
//
// The home page, served at /, like index.md at the root of a Jekyll site. Its
// content lives in src/components/blocks/homepage/Homepage.tsx. This file reads
// the newest updates from src/content/updates.md when the site is built (it has
// no 'use client', so it never runs in the browser) and hands them to the page.
import { Homepage } from '@/components/blocks/homepage/Homepage'
import { getHomepageUpdates } from '@/lib/updates/updates'

/** The page component for /. Next.js renders whatever it returns. */
export default function Home() {
    const { updates, hasOlder } = getHomepageUpdates()
    return <Homepage updates={updates} hasOlder={hasOlder} />
}
