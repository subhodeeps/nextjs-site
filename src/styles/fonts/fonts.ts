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
