// src/components/ui/terminal-nav/terminal-nav.tsx
//
// The navigation at the top of every page. Each page includes it as
// <TerminalNav />. The 'use client' line below makes it run in the browser,
// because it reacts to taps and to the Esc key.
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { cn } from '@/lib/utils/utils'
import { monoFont } from '@/styles/fonts/fonts'
import { ThemeToggle } from '@/components/ui/theme/theme-toggle'

/*
 * Site navigation, written as a shell prompt:
 *
 *     👾 ~/reading/marginalia ❯ ls ~ # tap to run
 *
 * and, once the command is tapped, its output:
 *
 *     about/  research/  cv/  learning/  reading/  blog/
 *
 * Design decisions, recorded here so they are not undone by accident:
 *
 * - The listing is hidden until you tap `ls ~`, so the prompt stays a single
 *   line. The only hint is a shell comment after the command, # tap to run (or
 *   # click to run on a desktop), in a faint accent colour so that it stays
 *   innocuous. Tapping it also runs the command, and it goes away while the
 *   listing is open. Tapping the command again, or pressing Esc, hides the listing.
 * - On the home page you are already in ~, so the command is plain `ls`, and
 *   its output starts open, like a session that has just run it. That is also
 *   where first-time visitors need the sections most.
 * - The listing is the six sections, so every section can be reached from
 *   every page. They are in the order of the original nav row, not
 *   alphabetical. collaborations/ and older_updates/ are left out on purpose:
 *   Collaborations is linked from the About and Research pages, and Older
 *   Updates from the updates on the home page.
 * - The path is clickable: ~ and each parent directory link to that page, so it
 *   also works as a breadcrumb. The current directory is plain text.
 * - The section you are in is shown in the accent colour.
 * - On small screens the listing wraps into two rows of three, still in order
 *   from left to right, and a long path is shortened the way the fish shell
 *   shortens it, ~/r/marginalia, keeping the current directory in full. The
 *   prompt never breaks onto a second line: when the hint does not fit after
 *   `❯ ls ~`, it is left out, and a path too long even without it ends in "…".
 * - The prompt starts with PROMPT_SYMBOL on every page, linking home. It
 *   replaced the floating alien that used to sit in the home page hero.
 */

// The symbol at the start of the prompt; a single character or emoji works best
const PROMPT_SYMBOL = '👾'

// The sections listed by `ls ~`, in the order of the original nav row
const SECTIONS = ['about', 'research', 'cv', 'learning', 'reading', 'blog']

// Paths longer than this (in characters, ~/ included) are shortened on small
// screens, which leaves room for the hint on more pages
const LONG_PATH = 12

// The outline shown around a link or button reached with the Tab key. It is drawn
// inside the element (ring-inset), because the prompt row hides anything outside it.
const focusRing =
    'rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring'

/**
 * The navigation prompt with its theme toggle.
 *
 * @param className extra Tailwind classes, such as "mb-8" for space below
 */
export function TerminalNav({ className }: { className?: string }) {
    // The current address, such as "/reading/marginalia", split into its parts:
    // ["reading", "marginalia"]. filter(Boolean) drops the empty part before the first /.
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)
    const shorten = `~/${segments.join('/')}`.length > LONG_PATH
    const atHome = segments.length === 0
    // Whether the listing is showing. useState keeps the value while the page is
    // open; setOpen changes it and redraws the navigation.
    const [open, setOpen] = useState(atHome)

    // While the listing is open, listen for the Esc key and close it. The function
    // returned at the end removes the listener again when it is no longer needed.
    useEffect(() => {
        if (!open) return
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open])

    return (
        <nav
            aria-label="Site"
            className={cn(monoFont.className, 'text-[13px] sm:text-sm', className)}
        >
            <div className="flex items-center justify-between gap-4">
                {/* The prompt row is exactly one line (24px) tall and hides anything
                    below that line. The symbol, the path and the command are one unit
                    that never breaks; the hint comes after it, so when there is no
                    room for the hint, it wraps onto the hidden second line. */}
                <div className="flex h-6 min-w-0 flex-wrap items-center gap-x-2 overflow-hidden leading-6">
                    <span className="flex min-w-0 items-center gap-x-2 whitespace-nowrap">
                        {atHome ? (
                            <span aria-hidden="true">{PROMPT_SYMBOL}</span>
                        ) : (
                            <Link href="/" aria-label="Home" className={focusRing}>
                                {PROMPT_SYMBOL}
                            </Link>
                        )}

                        {/* The path: ~ followed by one part per segment. ['~', ...segments]
                            is a new list with ~ in front; .map loops over it, and i is
                            the position (0 for ~). `truncate` ends it in "…" if the
                            command would otherwise not fit. */}
                        <span className="min-w-0 truncate">
                            {['~', ...segments].map((label, i) => {
                                const href = i === 0 ? '/' : `/${segments.slice(0, i).join('/')}`
                                const current = i === segments.length
                                const text =
                                    shorten && i > 0 && !current ? (
                                        <>
                                            <span className="sm:hidden">{label[0]}</span>
                                            <span className="hidden sm:inline">{label}</span>
                                        </>
                                    ) : (
                                        label
                                    )
                                return (
                                    <Fragment key={href}>
                                        {i > 0 && (
                                            <span className="text-muted-foreground/60">/</span>
                                        )}
                                        {current ? (
                                            <span className="text-foreground">{text}</span>
                                        ) : (
                                            <Link
                                                href={href}
                                                className={cn(
                                                    focusRing,
                                                    'text-muted-foreground transition-colors hover:text-accent',
                                                )}
                                            >
                                                {text}
                                            </Link>
                                        )}
                                    </Fragment>
                                )
                            })}
                        </span>

                        <span className="shrink-0">
                            <span aria-hidden="true" className="mr-2 text-accent-muted">
                                ❯
                            </span>
                            <button
                                type="button"
                                onClick={() => setOpen(!open)}
                                aria-expanded={open}
                                aria-controls="terminal-nav-output"
                                className={cn(
                                    focusRing,
                                    'text-left transition-colors hover:text-accent',
                                    open ? 'text-accent' : 'text-foreground',
                                )}
                            >
                                {atHome ? 'ls' : 'ls ~'}
                            </button>
                        </span>
                    </span>

                    {/* The hint, a faint shell comment; tapping it also runs the command.
                        Screen readers skip it, since the button above says the same. */}
                    {!open && (
                        <span
                            aria-hidden="true"
                            onClick={() => setOpen(true)}
                            className="cursor-pointer whitespace-nowrap text-accent-muted/60"
                        >
                            # <span className="[@media(hover:hover)]:hidden">tap</span>
                            <span className="hidden [@media(hover:hover)]:inline">click</span> to
                            run
                        </span>
                    )}
                </div>
                <ThemeToggle />
            </div>

            {/* The output of `ls`, drawn only while `open` is true */}
            {open && (
                <ul
                    id="terminal-nav-output"
                    className="mt-1 grid grid-cols-[repeat(3,max-content)] gap-x-[2ch] sm:flex sm:flex-wrap"
                >
                    {SECTIONS.map((name) => (
                        <li key={name}>
                            <Link
                                href={`/${name}`}
                                aria-current={pathname === `/${name}` ? 'page' : undefined}
                                className={cn(
                                    focusRing,
                                    'inline-block py-1 transition-colors sm:py-0.5',
                                    segments[0] === name
                                        ? 'text-accent'
                                        : 'text-muted-foreground hover:text-accent',
                                )}
                            >
                                {name}/
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    )
}
