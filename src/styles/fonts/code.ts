// src/styles/fonts/code.ts
//
// The font of code: in code blocks, `inline code`, and the chips styled like
// inline code. It differs from JetBrains Mono, the font of the text, so that
// code stands apart from it, and it includes Greek, for names such as φ. It is
// kept apart from fonts.ts so that only the pages with code load it.
import { Source_Code_Pro } from 'next/font/google'

export const codeFont = Source_Code_Pro({
    subsets: ['latin', 'greek'],
    style: ['normal', 'italic'],
})
