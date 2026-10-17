// src/app/learning/_types/note-types.ts
//
// The fields of one card in ../_data/posts.ts, and their types.
import type { LucideIcon } from 'lucide-react'

export interface NotesTypes {
    id: number // unique, used as a key
    title: string
    description: string
    lastUpdated: string // shown as "Last Updated: ..."
    slug?: string // optional, unused
    href: string // where the card links to
    icon?: LucideIcon // a lucide-react icon shown before the title, such as Atom
}
