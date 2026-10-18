// src/components/blocks/zoom-image/zoom-image.tsx
//
// An image in a post, written in Markdown as ![description](/path/image.png
// "Caption"), and the view that opens when it is clicked: the image, enlarged as
// the covers on the Reading page are, with its caption under it. It runs in the
// browser ('use client' below), because it reacts to clicks and keys.
'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { InlineLinks } from '@/components/ui/inline-links/inline-links'
import { cn } from '@/lib/utils/utils'
import { monoFont } from '@/styles/fonts/fonts'

// The outline shown around the image, a link or a button reached with the Tab key
const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

// The look of links in the caption
const captionLink =
    'underline decoration-accent-muted/50 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent-muted'

/** The caption, in small grey type, with any [text](address) drawn as a link */
function Caption({ text, className }: { text: string; className?: string }) {
    return (
        <span
            className={cn('block text-center text-muted-foreground', monoFont.className, className)}
        >
            <InlineLinks text={text} linkClassName={captionLink} />
        </span>
    )
}

/**
 * The image across the full width, with rounded corners and a faint border, and
 * the caption (if any) under it; clicking it opens the enlarged view. Markdown
 * puts an image inside a paragraph, where a <figure> or <div> is not allowed, so
 * the parts are <span>s shown as blocks, and the enlarged view is drawn at the end
 * of the page's <body> (createPortal) instead of inside the paragraph.
 *
 * @param src   the image's address
 * @param alt   the description, read out by screen readers
 * @param title the caption
 */
export default function ZoomImage({
    src,
    alt,
    title,
}: {
    src?: string
    alt?: string
    title?: string
}) {
    const [open, setOpen] = useState(false)
    // The body exists only in the browser, so the view is drawn there only once
    // the page has loaded
    const [mounted, setMounted] = useState(false)
    // A name shared by the image and its enlarged copy, which makes the copy grow
    // out of the image; useId makes it different for each image on the page
    const layoutId = useId()
    const captionId = `${layoutId}-caption`

    // Handles on the image's button, the open view and its close button, for
    // moving the keyboard focus
    const opener = useRef<HTMLButtonElement>(null)
    const view = useRef<HTMLDivElement>(null)
    const closeButton = useRef<HTMLButtonElement>(null)

    useEffect(() => setMounted(true), [])

    // While the view is open: keep the page behind it from scrolling, move the
    // focus to the close button, close on Esc and keep Tab inside the view. The
    // function returned at the end undoes this when the view closes, and gives the
    // focus back to the image.
    useEffect(() => {
        if (!open) return
        const button = opener.current
        document.body.style.overflow = 'hidden'
        closeButton.current?.focus()

        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false)
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
            button?.focus()
        }
    }, [open])

    const close = () => setOpen(false)

    return (
        // reducedMotion="user" turns the movement off for visitors who have asked
        // their system for reduced motion
        <MotionConfig reducedMotion="user">
            <span className="my-8 block">
                <motion.button
                    ref={opener}
                    layoutId={layoutId}
                    type="button"
                    aria-haspopup="dialog"
                    aria-label={alt ? `Enlarge: ${alt}` : 'Enlarge image'}
                    onClick={() => setOpen(true)}
                    className={cn('block w-full cursor-zoom-in rounded-lg', focusRing)}
                >
                    {/* A plain <img>: the site is a static export, so Next.js's <Image>
                        would not resize it anyway, and the size of an image in a post
                        is not known in advance */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src}
                        alt={alt ?? ''}
                        loading="lazy"
                        className="block h-auto w-full rounded-lg border border-border"
                    />
                </motion.button>
                {title && <Caption text={title} className="mt-2 text-xs" />}
            </span>

            {mounted &&
                createPortal(
                    // AnimatePresence lets the view animate out when it closes
                    <AnimatePresence>
                        {open && (
                            <div
                                ref={view}
                                role="dialog"
                                aria-modal="true"
                                aria-label={alt || 'Image'}
                                aria-describedby={title ? captionId : undefined}
                                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
                            >
                                {/* The blurred backdrop; clicking it closes the view */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={close}
                                    className="absolute inset-0 cursor-pointer bg-background/90 backdrop-blur-md"
                                />

                                {/* The image, as large as fits, and the caption under it */}
                                <div className="relative flex max-h-full w-full max-w-5xl flex-col items-center gap-4">
                                    <motion.div
                                        layoutId={layoutId}
                                        onClick={close}
                                        className="min-h-0 cursor-zoom-out"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={src}
                                            alt=""
                                            className="block max-h-[80vh] w-auto max-w-full rounded-lg shadow-2xl"
                                        />
                                    </motion.div>
                                    {title && (
                                        <motion.span
                                            id={captionId}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                transition: { delay: 0.15 },
                                            }}
                                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                            className="block max-w-2xl"
                                        >
                                            <Caption text={title} className="text-xs sm:text-sm" />
                                        </motion.span>
                                    )}
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
                    </AnimatePresence>,
                    document.body,
                )}
        </MotionConfig>
    )
}
