// src/components/ui/theme/theme-toggle.tsx
//
// The sun/moon button at the top right of every page, which switches between the
// light and dark themes. It sits in the navigation (components/ui/terminal-nav).
// The 'use client' line below makes it run in the browser, since it reacts to clicks.
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/utils'
import { useState, useEffect } from 'react'

/**
 * The theme toggle button. Shows a moon in the dark theme and a sun in the light
 * one, and switches to the other theme when clicked.
 */
export function ThemeToggle({ className }: { className?: string }) {
    // useState keeps a value between redraws: `mounted` holds it, and calling
    // setMounted changes it and redraws the button.
    const [mounted, setMounted] = useState(false)
    // The current theme, and a function that changes it, from next-themes
    const { theme, setTheme, systemTheme } = useTheme()

    // Wait until mounted to prevent hydration mismatch. The page is built ahead of
    // time, when the visitor's theme is unknown; useEffect runs only once the page
    // is in the browser, so only then is the right icon known.
    useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')

    // If we haven't mounted yet, render a blank placeholder of the exact same size
    // This prevents layout shift and keeps Next.js happy during SSR
    if (!mounted) {
        return (
            <div className={cn(
                'relative p-2 rounded-lg inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9',
                className
            )} />
        )
    }

    return (
        // motion.button is a <button> that framer-motion can animate: it fades and
        // grows in from `initial` to `animate`
        <motion.button
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={cn(
                'relative p-2 rounded-lg inline-flex items-center justify-center',
                'text-muted-foreground hover:text-foreground',
                'transition-colors duration-200',
                'hover:bg-muted',
                className
            )}
            aria-label="Toggle theme"
        >
            {/* Spins the icon round when the theme changes */}
            <motion.div
                initial={false}
                animate={{
                    rotate: isDark ? 360 : 0,
                    scale: isDark ? [1, 0.8, 1] : [1, 0.8, 1]
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5"
            >
                {isDark ? (
                    <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                    <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
            </motion.div>
        </motion.button>
    )
}
