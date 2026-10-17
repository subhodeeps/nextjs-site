// src/app/reading/_data/posts.ts
//
// A list of cards for the Reading page, like a _data file in Jekyll.
// Not used at the moment: the Reading page links to its subpages within its text.
import { NotesTypes } from "../_types/note-types"

export const notes: NotesTypes[] = [
    {id: 1,
    title: "Essays and Fiction Worth Reading",
    description: "Some essays and fiction that I have enjoyed reading.",
    lastUpdated: "January 14, 2025",
    href: "/reading/articles"
    }
] 
