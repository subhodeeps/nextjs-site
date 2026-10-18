// src/styles/fonts/bengali.ts
//
// A Bengali font, for the About page's title. No Bengali font is truly
// monospaced, since conjuncts and vowel signs cannot sit in cells of equal
// width; the even, monolinear letters of Anek Bangla come closest to the site's
// monospace fonts. Like them, it is downloaded when the site is built and served
// with it, so the title looks the same on every device. It is kept apart from
// fonts.ts so that only the About page loads it.
import { Anek_Bangla } from 'next/font/google'

export const bengaliFont = Anek_Bangla({
    subsets: ['bengali'],
    weight: '700',
})
