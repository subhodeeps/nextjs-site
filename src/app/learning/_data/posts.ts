// src/app/learning/_data/posts.ts
//
// The cards shown on the Learning page, in order, like a _data file in Jekyll.
// Each entry links to a subpage (href); add an entry to add a card. The icon,
// from lucide-react (https://lucide.dev/icons), is shown before the title.
import { Atom, Feather } from 'lucide-react'
import { NotesTypes } from '../_types/note-types'

export const notes: NotesTypes[] = [
    {
        id: 1,
        title: 'Physics References',
        description:
            'A collection of useful and interesting references and reviews on various topics in physics and allied areas',
        lastUpdated: 'January 20, 2025',
        href: '/learning/refs',
        icon: Atom,
    },
    {
        id: 2,
        title: 'Essays and Articles',
        description:
            'Some essays and articles that I have enjoyed reading. These are mostly non-technical in style, and occasionally cover subjects beyond math and science. ',
        lastUpdated: 'January 14, 2025',
        href: '/learning/articles',
        icon: Feather,
    },
]
