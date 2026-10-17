// src/app/reading/_data/books.ts
//
// The books shown on the Reading page, in order, like a _data file in Jekyll. To
// add a book, put its cover in public/covers/ and add an entry below. Only the
// title, author and cover are needed; the other fields (see ../_types/book.ts)
// appear when the cover is clicked. An entry with every field looks like this:
//
//     {
//         title: 'Title: Subtitle',
//         author: 'Author Name',
//         cover: '/covers/file-name.jpg',
//         translator: 'Translator Name',
//         publisher: 'Publisher',
//         published: '2019',
//         pages: 320,
//         isbn: '9780000000000',
//         blurb: `The first paragraph of the description.
//
//             The second paragraph.`,
//         review: 'https://example.com/my-review',
//     },
//
// The blurb is written between backticks (`), so it can run over several lines
// and contain both kinds of quotation marks.
import { Book } from '../_types/book'

export const books: Book[] = [
    {
        title: 'Figuring',
        author: 'Maria Popova',
        cover: '/covers/popova.jpg',
    },
    {
        title: 'Pachinko',
        author: 'Min Jin Lee',
        cover: '/covers/pachinko.jpg',
    },
    {
        title: 'Inspector Imanishi Investigates',
        author: 'Seicho Matsumoto',
        cover: '/covers/imanishi.jpg',
    },
    {
        title: "Aristotle: Understanding the World's Greatest Philosopher",
        author: 'John Sellars',
        cover: '/covers/aristotle.jpg',
    },
    {
        title: 'In a Flight of Starlings: The Wonders of Complex Systems',
        author: 'Giorgio Parisi',
        cover: '/covers/parisi.jpg',
    },
    {
        title: "The Sense of Style: The Thinking Person's Guide to Writing in the 21st Century",
        author: 'Steven Pinker',
        cover: '/covers/sos.jpg',
    },
]
