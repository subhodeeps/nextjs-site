'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/utils'
import { useState, useEffect } from 'react'

export function ThemeToggle({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, systemTheme } = useTheme()
    
    // Wait until mounted to prevent hydration mismatch
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
        <motion.button
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={cn(
                'relative p-2 rounded-lg inline-flex items-center justify-center',
                'text-muted-foreground hover:text-foreground',
                'transition-colors duration-200',
                'hover:bg-gray-100 dark:hover:bg-gray-800',
                className
            )}
            aria-label="Toggle theme"
        >
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