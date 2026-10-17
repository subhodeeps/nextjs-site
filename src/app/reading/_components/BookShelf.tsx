// src/app/reading/_components/BookShelf.tsx
//
// The covers on the Reading page, and the view that opens when one is clicked:
// the cover, enlarged as the photos on the Collaborations page are, beside the
// book's title, author and details. It runs in the browser ('use client' below),
// because it reacts to clicks and keys. The books come from ../_data/books.ts, by
// way of ../page.tsx, which adds the size of each cover.
'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { X } from 'lucide-react'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { cn } from '@/lib/utils/utils'
import { Book } from '../_types/book'

// A book together with the size of its cover in pixels, which the image needs to
// reserve its space before it has loaded
export type ShelfBook = Book & { width: number; height: number }

// The outline shown around a cover, link or button reached with the Tab key
const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

/**
 * The covers and, while one is selected, the enlarged view of that book.
 *
 * @param books the books, in the order of ../_data/books.ts
 */
export function BookShelf({ books }: { books: ShelfBook[] }) {
    // The position in `books` of the book being shown, or null while none is.
    // useState keeps the value between redraws; setSelected changes it.
    const [selected, setSelected] = useState<number | null>(null)
    const book = selected === null ? null : books[selected]
    const close = () => setSelected(null)

    // Handles on elements of the page, for moving the keyboard focus: the cover
    // buttons, the open view and its close button
    const covers = useRef<(HTMLButtonElement | null)[]>([])
    const view = useRef<HTMLDivElement>(null)
    const closeButton = useRef<HTMLButtonElement>(null)

    // While a book is shown: keep the page behind it from scrolling, move the
    // focus to the close button, close on Esc and keep Tab inside the view. The
    // function returned at the end undoes this when the view closes, and gives the
    // focus back to the cover that opened it.
    useEffect(() => {
        if (selected === null) return
        const opener = covers.current[selected]
        document.body.style.overflow = 'hidden'
        closeButton.current?.focus()

        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setSelected(null)
            if (event.key !== 'Tab' || !view.current) return
            // Tab from the last link or button goes back to the first, and
            // Shift+Tab from the first goes to the last
            const items = view.current.querySelectorAll<HTMLElement>('a[href], button')
            const first = items[0]
            const last = items[items.length - 1]
            const inside = view.current.contains(document.activeElement)
            if (event.shiftKey && (document.activeElement === first || !inside)) {
                event.preventDefault()
                last.focus()
            } else if (!event.shiftKey && (document.activeElement === last || !inside)) {
                event.preventDefault()
                first.focus()
            }
        }
        window.addEventListener('keydown', onKey)
        return () => {
            window.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
            opener?.focus()
        }
    }, [selected])

    return (
        // reducedMotion="user" turns the movement off for visitors who have asked
        // their system for reduced motion
        <MotionConfig reducedMotion="user">
            {/* The covers: two columns on phones, three from md:, five from lg:. They
                are not cropped, so their bottoms are lined up, as on a shelf. */}
            <div className="grid grid-cols-2 items-end gap-6 md:grid-cols-3 lg:grid-cols-5">
                {books.map((item, i) => (
                    <motion.button
                        key={item.cover}
                        // The same layoutId as the enlarged cover below, which makes
                        // that one grow out of this one
                        layoutId={`book-cover-${i}`}
                        ref={(element) => {
                            covers.current[i] = element
                        }}
                        type="button"
                        aria-haspopup="dialog"
                        onClick={() => setSelected(i)}
                        className={cn('group block w-full rounded-lg', focusRing)}
                    >
                        <Image
                            src={item.cover}
                            alt={`${item.title} by ${item.author}`}
                            width={item.width}
                            height={item.height}
                            className="h-auto w-full rounded-lg shadow-md transition-transform duration-200 group-hover:scale-[1.03]"
                        />
                    </motion.button>
                ))}
            </div>

            {/* The enlarged view. AnimatePresence lets it animate out when it closes. */}
            <AnimatePresence>
                {book && selected !== null && (
                    <div
                        ref={view}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="book-title"
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
                    >
                        {/* The blurred backdrop; clicking it closes the view. It is less
                            see-through than on the Collaborations page, for the sake of
                            the text. */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={close}
                            className="absolute inset-0 cursor-pointer bg-background/90 backdrop-blur-md"
                        />

                        {/* The cover and the details: side by side from md:, one above the
                            other on phones. A long blurb scrolls inside this box. */}
                        <div className="relative flex max-h-full w-full max-w-3xl flex-col items-center gap-6 overflow-y-auto md:flex-row md:items-start md:gap-10">
                            {/* The cover; clicking it also closes the view. From md: it stays
                                in place (sticky) while a long blurb scrolls past it. */}
                            <motion.div
                                layoutId={`book-cover-${selected}`}
                                onClick={close}
                                className="w-40 shrink-0 cursor-pointer sm:w-48 md:sticky md:top-0 md:w-64"
                            >
                                <Image
                                    src={book.cover}
                                    alt=""
                                    width={book.width}
                                    height={book.height}
                                    className="h-auto w-full rounded-lg shadow-2xl"
                                />
                            </motion.div>

                            {/* The details, which fade in once the cover is in place */}
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
                                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                className="w-full min-w-0 md:flex-1"
                            >
                                <BookDetails book={book} />
                            </motion.div>
                        </div>

                        <button
                            ref={closeButton}
                            type="button"
                            aria-label="Close"
                            onClick={close}
                            className={cn(
                                'absolute right-3 top-3 rounded-full bg-background/70 p-2 text-muted-foreground transition-colors hover:text-foreground',
                                focusRing,
                            )}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </AnimatePresence>
        </MotionConfig>
    )
}

/** A link that opens in a new tab, in the accent colour */
function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('rounded-sm text-accent hover:underline', focusRing)}
        >
            {children}
        </a>
    )
}

/**
 * The text beside an enlarged cover: the title (with any subtitle on a line of
 * its own), the author, the details that were given (with the reviews elsewhere
 * and the Open Library page), the blurb and the link to my own review. Whatever
 * ../_data/books.ts leaves out is not shown.
 */
function BookDetails({ book }: { book: Book }) {
    // "Aristotle: Understanding ..." becomes the title "Aristotle" and the
    // subtitle "Understanding ..."
    const [title, ...rest] = book.title.split(': ')
    const subtitle = rest.join(': ')

    // The rows of the details list, leaving out the fields that are empty
    const rows: [string, string | number | undefined][] = [
        ['Translator', book.translator],
        ['Publisher', book.publisher],
        ['Published', book.published],
        ['Pages', book.pages],
        ['ISBN', book.isbn],
    ]
    const givenRows = rows.filter(([, value]) => value)
    const hasLinks = (book.reviews?.length ?? 0) > 0 || Boolean(book.openLibrary)

    // The paragraphs of the blurb, split at blank lines; a single line break
    // inside a paragraph counts as a space
    const paragraphs = (book.blurb ?? '')
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
        .filter(Boolean)

    return (
        <>
            <TextHeading
                as="h2"
                id="book-title"
                className="mb-1 mt-0 text-lg sm:text-xl lg:text-xl"
            >
                {title}
            </TextHeading>
            {subtitle && <Text variant="muted">{subtitle}</Text>}
            <Text className="mt-2">{book.author}</Text>

            {(givenRows.length > 0 || hasLinks) && (
                <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-xs sm:text-sm">
                    {givenRows.map(([label, value]) => (
                        <Fragment key={label}>
                            <dt className="text-muted-foreground">{label}</dt>
                            <dd>{value}</dd>
                        </Fragment>
                    ))}
                    {/* The reviews elsewhere, as links separated by dots */}
                    {book.reviews && book.reviews.length > 0 && (
                        <>
                            <dt className="text-muted-foreground">Reviews</dt>
                            <dd>
                                {book.reviews.map((item, i) => (
                                    <Fragment key={item.url}>
                                        {i > 0 && (
                                            <span className="text-muted-foreground"> · </span>
                                        )}
                                        <ExternalLink href={item.url}>{item.source}</ExternalLink>
                                    </Fragment>
                                ))}
                            </dd>
                        </>
                    )}
                    {book.openLibrary && (
                        <>
                            <dt className="text-muted-foreground">Catalog</dt>
                            <dd>
                                <ExternalLink href={book.openLibrary}>Open Library</ExternalLink>
                            </dd>
                        </>
                    )}
                </dl>
            )}

            {paragraphs.length > 0 && (
                <div className="mt-6 space-y-3">
                    {paragraphs.map((paragraph, i) => (
                        <Text key={i} className="leading-relaxed">
                            {paragraph}
                        </Text>
                    ))}
                </div>
            )}

            {book.review && (
                <a
                    href={book.review}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        'mt-6 inline-block rounded-sm text-xs text-accent hover:underline sm:text-sm',
                        focusRing,
                    )}
                >
                    Read my review →
                </a>
            )}
        </>
    )
}
