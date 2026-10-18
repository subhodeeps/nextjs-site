// src/app/research/collaborations/grid.tsx
//
// The photo grid on the Collaborations page, and the enlarged view that opens
// when a photo is clicked. It runs in the browser ('use client' below), because
// it shuffles the photos on each visit and reacts to clicks, keys and swipes.
//
// The shuffle is deliberate: a fixed order would suggest that the photos at the
// top matter more, so the order is drawn anew on every visit, and the grid stays
// invisible until then. Keep it when changing this file.
//
// The grid is laid out in "justified rows", as on photo sites: the photos in a
// row share one height and keep their own shape (nothing is cropped), and each
// row fills the width. On phones the photos form two rows instead, each swiped
// sideways on its own, so that the page stays short however many photos there
// are. The enlarged view grows out of the clicked photo; ← and →
// (or a swipe on a phone, or the ‹ › buttons under the photo) move through the
// photos, and Esc, the close button, the backdrop or a click on the photo closes it.
'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils/utils'
import { InlineLinks, stripLinks } from '@/components/ui/inline-links/inline-links'

type CollaboratorPhoto = {
    id: string
    name: string
    photoUrl: string
    width: number
    height: number
    caption?: string // from ./_data/captions.ts; [text](address) is a link
}

// The outline shown around a photo or button reached with the Tab key
const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

// How the enlarged photo moves when stepping to the next (direction 1) or the
// previous (-1) photo: the new one slides in from that side as the old one slides
// out the other way. Direction 0 is used when the view closes, and just fades.
const slide = {
    enter: (direction: number) => ({ opacity: 0, x: direction * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (direction: number) =>
        direction === 0
            ? { opacity: 0, transition: { duration: 0.15 } }
            : { opacity: 0, x: direction * -60 },
}

/**
 * Returns a copy of the list in random order (the Fisher-Yates shuffle). The <T>
 * means it works for a list of anything, and returns a list of the same kind.
 */
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

/**
 * The photo grid and, while a photo is selected, the enlarged view.
 *
 * @param initialPeople the photos, in folder order, from page.tsx
 */
export default function CollaboratorGrid({
    initialPeople,
}: {
    initialPeople: CollaboratorPhoto[]
}) {
    // The values kept with useState (they survive redraws; the set... functions
    // change them): the photos in their current order; whether the shuffle has
    // happened (the grid stays invisible until then, so the unshuffled order never
    // flashes up); the position of the enlarged photo, or null; the position of the
    // photo that was clicked, which alone grows out of its place in the grid (it is
    // cleared once another photo is shown, and the view then closes by fading); and
    // the direction of the last step.
    const [people, setPeople] = useState<CollaboratorPhoto[]>(initialPeople)
    const [isMounted, setIsMounted] = useState(false)
    const [selected, setSelected] = useState<number | null>(null)
    const [opened, setOpened] = useState<number | null>(null)
    const [direction, setDirection] = useState(0)
    // Whether the screen is at least 640px wide (Tailwind's sm:): the wrapping
    // grid there, the two swiped rows below that
    const [isWide, setIsWide] = useState(true)

    // Handles on elements of the page, for moving the keyboard focus: the photos
    // in the grid (looked up by their id, not their position, because the motion
    // buttons keep the first handle they are given, from before the shuffle), the
    // open view and its close button
    const tiles = useRef<Record<string, HTMLButtonElement | null>>({})
    const view = useRef<HTMLDivElement>(null)
    const closeButton = useRef<HTMLButtonElement>(null)

    // Shuffle instantly on load
    useEffect(() => {
        setPeople(shuffleArray(initialPeople))
        setIsMounted(true)
    }, [initialPeople])

    // Follow the screen width, including when a phone is turned sideways
    useEffect(() => {
        const query = window.matchMedia('(min-width: 640px)')
        const update = () => setIsWide(query.matches)
        update()
        query.addEventListener('change', update)
        return () => query.removeEventListener('change', update)
    }, [])

    const open = (i: number) => {
        setDirection(0)
        setOpened(i)
        setSelected(i)
    }

    // Closing gives the keyboard focus back to the photo being shown, and scrolls
    // it into view (on phones, the swiped row moves to it)
    const close = () => {
        const tile = selected === null ? null : tiles.current[people[selected].id]
        tile?.focus({ preventScroll: true })
        tile?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
        setDirection(0)
        setSelected(null)
    }

    // Shows the next (by = 1) or previous (by = -1) photo, wrapping around at the ends
    const step = (by: number) => {
        if (selected === null) return
        setDirection(by)
        setOpened(null)
        setSelected((selected + by + people.length) % people.length)
    }

    // While the view is open: keep the page behind it from scrolling and move the
    // focus to the close button. The function returned at the end undoes this.
    const isOpen = selected !== null
    useEffect(() => {
        if (!isOpen) return
        document.body.style.overflow = 'hidden'
        closeButton.current?.focus()
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    // The keys while the view is open: Esc closes it, ← and → step through the
    // photos, and Tab stays inside the view
    useEffect(() => {
        if (!isOpen) return
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') close()
            else if (event.key === 'ArrowRight') step(1)
            else if (event.key === 'ArrowLeft') step(-1)
            else if (event.key === 'Tab' && view.current) {
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
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    })

    const photo = selected === null ? null : people[selected]

    // One photo in the grid, at position i of the shuffled list. Its width is
    // (row height × its width-to-height ratio), and in the wrapping grid it also
    // grows in proportion to that ratio, which keeps the photos in a row at one
    // height while the row fills the width.
    const tile = (i: number) => {
        const person = people[i]
        const ratio = person.width / person.height
        return (
            <motion.button
                key={person.id}
                // The same layoutId as the enlarged photo, which makes that one grow
                // out of this one
                layoutId={`photo-${person.id}`}
                ref={(element) => {
                    tiles.current[person.id] = element
                }}
                type="button"
                aria-haspopup="dialog"
                aria-label={`Enlarge photo ${i + 1} of ${people.length}`}
                onClick={() => open(i)}
                style={
                    isWide
                        ? { flexGrow: ratio, flexBasis: `calc(var(--row) * ${ratio})` }
                        : { width: `calc(var(--row) * ${ratio})` }
                }
                // min-w-0 lets a photo be narrower than its image file, so that the
                // widths above decide how many fit in a row; shrink-0 keeps the photos
                // in the swiped rows at their full width
                className={cn(
                    'group min-w-0 overflow-hidden rounded-md',
                    !isWide && 'shrink-0',
                    focusRing,
                )}
            >
                <Image
                    src={person.photoUrl}
                    alt={person.caption ? stripLinks(person.caption) : person.name}
                    width={person.width}
                    height={person.height}
                    className="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.03]"
                />
            </motion.button>
        )
    }

    // For phones: the photos split into two rows. Each photo, in the shuffled
    // order, goes into whichever row is shorter so far, so the rows end together.
    const rows: number[][] = [[], []]
    const rowWidths = [0, 0]
    people.forEach((person, i) => {
        const r = rowWidths[0] <= rowWidths[1] ? 0 : 1
        rows[r].push(i)
        rowWidths[r] += person.width / person.height
    })

    return (
        // reducedMotion="user" turns the movement off for visitors who have asked
        // their system for reduced motion
        <MotionConfig reducedMotion="user">
            {isWide ? (
                // From sm: rows that wrap, 150px high (170px from lg:). The last item,
                // an empty spacer, keeps the last row from stretching.
                <div
                    className={cn(
                        'flex flex-wrap gap-2 [--row:150px] lg:[--row:170px]',
                        'transition-opacity duration-500',
                        isMounted ? 'opacity-100' : 'opacity-0',
                    )}
                >
                    {people.map((_, i) => tile(i))}
                    <div aria-hidden className="grow-[10]" />
                </div>
            ) : (
                // On phones: two rows of photos, 150px high, each swiped sideways on its
                // own (overflow-x-auto), so the page does not grow longer as photos
                // are added. Each row reaches the edges of the screen, so the next
                // photo peeks in: its negative side margins, calc(50% - 50vw), cancel
                // the page's side gutter (percentages there refer to the page column's
                // width), and its padding, calc(50vw - 50%), puts the gutter back
                // inside. The scroll bars are hidden.
                <div
                    className={cn(
                        'flex flex-col gap-2 [--row:150px]',
                        'transition-opacity duration-500',
                        isMounted ? 'opacity-100' : 'opacity-0',
                    )}
                >
                    {rows.map((row, r) => (
                        <div
                            key={r}
                            className={cn(
                                'mx-[calc(50%-50vw)] flex gap-2 overflow-x-auto px-[calc(50vw-50%)] py-1',
                                '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
                            )}
                        >
                            {row.map((i) => tile(i))}
                        </div>
                    ))}
                </div>
            )}

            {/* On phones, a faint hint under the swiped rows */}
            <p aria-hidden className="mt-2 text-xs text-accent-muted/60 sm:hidden">
                # swipe for more →
            </p>

            {/* The enlarged view. AnimatePresence lets it animate out when it closes. */}
            <AnimatePresence>
                {photo && selected !== null && (
                    <div
                        ref={view}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Photo ${selected + 1} of ${people.length}`}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-4 md:p-12"
                    >
                        {/* The blurred backdrop; clicking it closes the view */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={close}
                            className="absolute inset-0 cursor-pointer bg-background/90 backdrop-blur-md"
                        />

                        {/* The photo. Dragging it sideways by more than 60px (a swipe)
                            steps to the next or previous photo; a plain click or tap
                            (onTap, which a drag does not trigger) closes the view. */}
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.div
                                key={photo.id}
                                layoutId={selected === opened ? `photo-${photo.id}` : undefined}
                                custom={direction}
                                variants={slide}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                drag={people.length > 1 ? 'x' : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.3}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x < -60) step(1)
                                    else if (info.offset.x > 60) step(-1)
                                }}
                                onTap={close}
                                className="relative cursor-pointer overflow-hidden rounded-lg shadow-2xl"
                            >
                                <Image
                                    src={photo.photoUrl}
                                    alt={photo.caption ? stripLinks(photo.caption) : photo.name}
                                    width={photo.width}
                                    height={photo.height}
                                    draggable={false}
                                    className="block h-auto max-h-[72vh] w-auto max-w-full select-none"
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* The caption, if the photo has one, then the counter with buttons
                            for the previous and next photo, and a faint hint: the keys on a
                            desktop, swiping on a phone */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.15 } }}
                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            className="relative flex flex-col items-center gap-1 text-xs text-muted-foreground sm:text-sm"
                        >
                            {photo.caption && (
                                // key: a new caption fades in with each photo
                                <motion.p
                                    key={photo.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mb-2 max-w-prose text-balance text-center text-sm text-foreground/80 sm:text-base"
                                >
                                    <InlineLinks
                                        text={photo.caption}
                                        linkClassName={cn(
                                            'rounded-sm text-accent hover:underline',
                                            focusRing,
                                        )}
                                    />
                                </motion.p>
                            )}
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    aria-label="Previous photo"
                                    onClick={() => step(-1)}
                                    className={cn(
                                        'rounded-sm px-2 transition-colors hover:text-accent',
                                        focusRing,
                                    )}
                                >
                                    ‹
                                </button>
                                <span aria-live="polite" className="tabular-nums">
                                    {String(selected + 1).padStart(2, '0')} /{' '}
                                    {String(people.length).padStart(2, '0')}
                                </span>
                                <button
                                    type="button"
                                    aria-label="Next photo"
                                    onClick={() => step(1)}
                                    className={cn(
                                        'rounded-sm px-2 transition-colors hover:text-accent',
                                        focusRing,
                                    )}
                                >
                                    ›
                                </button>
                            </div>
                            <span
                                aria-hidden
                                className="text-[10px] text-accent-muted/60 sm:text-xs"
                            >
                                <span className="[@media(hover:hover)]:hidden">
                                    # swipe to browse
                                </span>
                                <span className="hidden [@media(hover:hover)]:inline">
                                    # ← → to browse, esc to close
                                </span>
                            </span>
                        </motion.div>

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
