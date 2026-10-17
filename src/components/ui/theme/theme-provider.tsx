// src/components/ui/theme/theme-provider.tsx
//
// Light and dark theme support, used once in the root layout. The 'use client'
// line below means this file also runs in the visitor's browser, because the
// theme depends on the visitor's settings and on the toggle button.
'use client'

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'

/**
 * Wraps the whole site and keeps track of the current theme. The next-themes
 * package does the work: it remembers the visitor's choice, follows the system
 * setting when there is none, and puts class="dark" on <html> for the dark theme,
 * which switches on every dark:... class. `...props` passes on any other settings
 * given to this component.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            {...props}
        >
            {children}
        </NextThemesProvider>
    )
}
