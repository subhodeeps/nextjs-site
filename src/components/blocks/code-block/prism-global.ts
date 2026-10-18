// src/components/blocks/code-block/prism-global.ts
//
// Prism's language files (see prism-languages.ts) add themselves to a global
// named Prism, so this file makes prism-react-renderer's copy of Prism that
// global. It is imported before them, which makes it run first.
import { Prism } from 'prism-react-renderer'

;(globalThis as { Prism?: typeof Prism }).Prism = Prism
