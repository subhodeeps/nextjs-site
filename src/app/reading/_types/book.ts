// src/app/reading/_types/book.ts
//
// The fields of one book in ../_data/books.ts, and their types. Only title,
// author and cover are needed. The others are shown, when given, next to the
// enlarged cover. Most of them can be copied from calibre's book details; its
// tags are left out on purpose.
export interface Book {
    title: string // the full title; a subtitle after ": " is shown on its own line
    author: string
    cover: string // the image in public/, such as '/covers/popova.jpg'
    translator?: string
    publisher?: string
    published?: string // written as it should appear, such as '2019' or 'March 2019'
    pages?: number
    isbn?: string
    blurb?: string // the description; a blank line starts a new paragraph
    review?: string // the address of a review, shown as a "Read my review" link
}
