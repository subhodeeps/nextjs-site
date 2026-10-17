// src/styles/fonts/fonts.ts
//
// The site's two fonts. next/font downloads them from Google Fonts when the site
// is built and serves them from the site itself, so visitors' browsers never
// contact Google. Each font object has a `className`; adding it to an element's
// className sets that element's font, as in className={monoFont.className}.
import { JetBrains_Mono, Fira_Code } from 'next/font/google'

// Body text, navigation and code. It is set on <body> in the root layout, so it
// is the default everywhere. Both fonts include Greek, for symbols such as Λ.
export const monoFont = JetBrains_Mono({
    subsets: ['latin', 'greek'],
    variable: '--font-mono',
})

// Headings
export const headingFont = Fira_Code({
    subsets: ['latin', 'greek'],
    variable: '--font-heading',
})
