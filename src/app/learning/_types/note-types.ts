// src/app/learning/_types/note-types.ts
//
// The fields of one card in ../_data/posts.ts, and their types.
export interface NotesTypes {
    id: number // unique, used as a key
    title: string
    description: string
    lastUpdated: string // shown as "Last Updated: ..."
    slug?: string // optional, unused
    href: string // where the card links to
}
