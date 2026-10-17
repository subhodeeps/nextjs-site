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
 *     👾 ~/learning/books ❯ ls ~  # tap to list
 *
 * and, once the command is tapped, its output:
 *
 *     about/  research/  cv/  learning/  reading/  blog/
 *
 * Design decisions, recorded here so they are not undone by accident:
 *
 * - The listing is hidden until you tap `ls ~`, so the prompt stays a single
 *   line. The dim shell comment after the command (# tap to list, or # click
 *   to list on a desktop) is the only hint, and it goes away while the listing
 *   is open. Tapping the command again, or pressing Esc, hides the listing.
 * - On the home page you are already in ~, so the command is plain `ls`, and
 *   its output starts open, like a session that has just run it. That is also
 *   where first-time visitors need the sections most.
 * - The listing is the six sections, so every section can be reached from
 *   every page. They are in the order of the original nav row, not
 *   alphabetical. collaborations/ and older_updates/ are left out on purpose:
 *   Collaborations is linked from the About and Research pages, and Older
 *   Updates from the updates on the home page.
 * - The path is clickable: ~ and each parent directory link to that page, so it
 *   also works as a breadcrumb. The current directory is plain text, and so is
 *   blog/posts, which holds the post files but is not a page.
 * - The section you are in is shown in the accent colour.
 * - On small screens the listing wraps into two rows of three, still in order
 *   from left to right, and a long path is shortened the way the fish shell
 *   shortens it, ~/l/b/s/chapter-1, keeping the current directory in full. If
 *   the prompt still does not fit, `❯ ls ~` moves to a second line as a whole,
 *   like a two-line shell prompt.
 * - The prompt starts with PROMPT_SYMBOL on every page, linking home. It
 *   replaced the floating alien that used to sit in the home page hero.
 */

// The symbol at the start of the prompt; a single character or emoji works best
const PROMPT_SYMBOL = '👾'

// The sections listed by `ls ~`, in the order of the original nav row
const SECTIONS = ['about', 'research', 'cv', 'learning', 'reading', 'blog']

// Folders in a path that are not pages of their own, so they are not linked
const NOT_PAGES = ['/blog/posts']

// Paths longer than this (in characters, ~/ included) are shortened on small
// screens, so that most pages keep the prompt on one line
const LONG_PATH = 15

const focusRing = 'rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'

/**
 * The navigation prompt with its theme toggle.
 *
 * @param className extra Tailwind classes, such as "mb-8" for space below
 */
export function TerminalNav({ className }: { className?: string }) {
    // The current address, such as "/learning/books", split into its parts:
    // ["learning", "books"]. filter(Boolean) drops the empty part before the first /.
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
        <nav aria-label="Site" className={cn(monoFont.className, 'text-[13px] sm:text-sm', className)}>
            <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 flex-wrap items-baseline gap-x-2">
                    {atHome ? (
                        <span aria-hidden="true">{PROMPT_SYMBOL}</span>
                    ) : (
                        <Link href="/" aria-label="Home" className={focusRing}>{PROMPT_SYMBOL}</Link>
                    )}

                    {/* The path: ~ followed by one part per segment. ['~', ...segments]
                        is a new list with ~ in front; .map loops over it, and i is
                        the position (0 for ~). */}
                    <span>
                        {['~', ...segments].map((label, i) => {
                            const href = i === 0 ? '/' : `/${segments.slice(0, i).join('/')}`
                            const current = i === segments.length
                            const text = shorten && i > 0 && !current ? (
                                <>
                                    <span className="sm:hidden">{label[0]}</span>
                                    <span className="hidden sm:inline">{label}</span>
                                </>
                            ) : label
                            return (
                                <Fragment key={href}>
                                    {i > 0 && <span className="text-muted-foreground/60">/</span>}
                                    {current || NOT_PAGES.includes(href) ? (
                                        <span className={current ? 'text-foreground' : 'text-muted-foreground'}>{text}</span>
                                    ) : (
                                        <Link href={href} className={cn(focusRing, 'text-muted-foreground transition-colors hover:text-accent')}>
                                            {text}
                                        </Link>
                                    )}
                                </Fragment>
                            )
                        })}
                    </span>

                    {/* Kept together, so it wraps to a second line as a whole */}
                    <span className="whitespace-nowrap">
                        <span aria-hidden="true" className="mr-2 text-accent-muted">❯</span>
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            aria-expanded={open}
                            aria-controls="terminal-nav-output"
                            className={cn(focusRing, 'text-left transition-colors hover:text-accent', open ? 'text-accent' : 'text-foreground')}
                        >
                            {atHome ? 'ls' : 'ls ~'}
                            {!open && (
                                <span className="ml-[2ch] text-muted-foreground/70">
                                    # <span className="[@media(hover:hover)]:hidden">tap</span>
                                    <span className="hidden [@media(hover:hover)]:inline">click</span> to list
                                </span>
                            )}
                        </button>
                    </span>
                </div>
                <ThemeToggle />
            </div>

            {/* The output of `ls`, drawn only while `open` is true */}
            {open && (
                <ul id="terminal-nav-output" className="mt-1 grid grid-cols-[repeat(3,max-content)] gap-x-[2ch] sm:flex sm:flex-wrap">
                    {SECTIONS.map((name) => (
                        <li key={name}>
                            <Link
                                href={`/${name}`}
                                aria-current={pathname === `/${name}` ? 'page' : undefined}
                                className={cn(
                                    focusRing,
                                    'inline-block py-1 transition-colors sm:py-0.5',
                                    segments[0] === name ? 'text-accent' : 'text-muted-foreground hover:text-accent'
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
