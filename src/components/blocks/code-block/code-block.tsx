// src/components/blocks/code-block/code-block.tsx
//
// A fenced code block in a post or note: a box with the language name, a copy
// button, and the code coloured by syntax. Every ```python ... ``` block in a
// post or an .mdx file is drawn by this component (see
// src/lib/mdx/mdx-components.tsx); the languages it can colour are listed in
// prism-languages.ts. The 'use client' line below makes it run in the browser,
// for the copy button and for the colours, which depend on the current theme.
'use client'

import { cn } from '@/lib/utils/utils'
import { codeFont } from '@/styles/fonts/code'
import { Highlight } from 'prism-react-renderer'
import './prism-languages'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

/**
 * The bar at the top of a code block: the language name on the left, and on the
 * right a button that copies the code and shows "COPIED!" for two seconds.
 */
const CopyButton = ({ code, language }: { code: string; language?: string }) => {
    // Whether the code was just copied; changing it redraws the button
    const [copied, setCopied] = useState(false)

    // `async` lets the function wait (`await`) for the clipboard to accept the
    // text; setTimeout then switches "COPIED!" off again after 2000 ms
    const copy = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex items-center justify-between border-b border-border bg-transparent px-4 py-2">
            {/* Language Label */}
            <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {language || 'text'}
            </div>

            {/* Copy Button & Feedback */}
            <div className="flex items-center gap-2">
                <div
                    className={cn(
                        'text-[10px] sm:text-xs transition-all duration-300 pointer-events-none',
                        'text-accent',
                        copied ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4',
                    )}
                >
                    COPIED!
                </div>
                <button
                    onClick={copy}
                    className={cn(
                        'p-1.5 rounded-md transition-all duration-300 ease-in-out',
                        'hover:bg-accent-subtle',
                        copied ? 'text-accent' : 'text-muted-foreground hover:text-accent',
                    )}
                    aria-label="Copy code"
                >
                    <div className="relative w-3.5 h-3.5 sm:w-4 sm:h-4">
                        <div
                            className={cn(
                                'absolute inset-0 transform transition-all duration-300',
                                copied
                                    ? 'opacity-0 rotate-45 scale-0'
                                    : 'opacity-100 rotate-0 scale-100',
                            )}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                        </div>
                        <div
                            className={cn(
                                'absolute inset-0 transform transition-all duration-300',
                                copied
                                    ? 'opacity-100 rotate-0 scale-100'
                                    : 'opacity-0 -rotate-45 scale-0',
                            )}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}

interface CodeBlockProps {
    code: string
    language: string
    className?: string
}

// Syntax colours from the amore palettes in globals.css: ink tones on the light
// theme, light tones on the dark theme.
const tone = (palette: string, isDark: boolean) =>
    `hsl(var(--amore-${palette}-${isDark ? 'light' : 'ink'}))`

/**
 * The colour scheme handed to the syntax highlighter: a colour for plain text,
 * then one for each kind of token (keywords, comments, strings and so on).
 */
const getTheme = (isDark: boolean) => ({
    plain: {
        backgroundColor: 'transparent',
        color: tone('slate', isDark),
    },
    styles: [
        { types: ['keyword', 'builtin'], style: { color: 'hsl(var(--accent))' } },
        {
            types: ['comment'],
            style: { color: 'hsl(var(--muted-foreground))', fontStyle: 'italic' as const },
        },
        { types: ['class-name', 'function'], style: { color: tone('blue', isDark) } },
        { types: ['string', 'attr-value'], style: { color: tone('green', isDark) } },
        { types: ['punctuation', 'operator'], style: { color: tone('teal', isDark) } },
        { types: ['number', 'constant'], style: { color: tone('amber', isDark) } },
        { types: ['variable'], style: { color: tone('red', isDark) } },
    ],
})

/**
 * A highlighted code block.
 *
 * @param code     the code to show
 * @param language its language, such as 'bash' or 'python', which decides the colours
 */
export default function CodeBlock({ code, language, className }: CodeBlockProps) {
    const { theme, systemTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Prevent hydration mismatch. The page is built before the visitor's theme is
    // known; useEffect runs once the page is in the browser, and only then are the
    // colours switched to the visitor's theme.
    useEffect(() => {
        setMounted(true)
    }, [])

    // Safely check if we are in dark mode (accounting for 'system' theme)
    const currentTheme = theme === 'system' ? systemTheme : theme
    const isDark = mounted ? currentTheme === 'dark' : true

    return (
        <div
            className={cn(
                'relative my-6 w-full rounded-lg overflow-hidden border shadow-none',
                // A grey tint, so the block stands apart from the page in either theme
                'bg-muted/50 border-border',
                className,
            )}
        >
            <CopyButton code={code} language={language} />

            {/* Highlight splits the code into lines of tokens and hands them to the
                function inside it, which draws each line and each coloured token */}
            <Highlight theme={getTheme(isDark)} code={code} language={language}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                        className={cn(
                            className,
                            codeFont.className,
                            'overflow-x-auto whitespace-pre-wrap break-words',
                            'transition-colors duration-200',
                            'p-4 pt-3',
                            'text-[11px] sm:text-[13px]',
                            'bg-transparent', // Forces Prism to inherit our Tailwind background!
                        )}
                        style={{ ...style, backgroundColor: 'transparent', fontFamily: 'inherit' }}
                    >
                        {/* slice(0, -1) drops the empty last line that the Markdown leaves */}
                        {tokens.slice(0, -1).map((line, i) => (
                            <div
                                key={i}
                                {...getLineProps({ line, className: 'leading-5 sm:leading-6' })}
                            >
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token })} />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </div>
    )
}
