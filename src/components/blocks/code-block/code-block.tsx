'use client'

import { cn } from '@/lib/utils/utils'
import { monoFont } from '@/styles/fonts/fonts'
import { Highlight } from 'prism-react-renderer'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

// Copy button component
const CopyButton = ({ code, language }: { code: string; language?: string }) => {
    const [copied, setCopied] = useState(false);
    
    const copy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center justify-between border-b border-neutral-200/80 dark:border-neutral-800/80 bg-transparent px-4 py-2">
            {/* Language Label */}
            <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {language || 'text'}
            </div>

            {/* Copy Button & Feedback */}
            <div className="flex items-center gap-2">
                <div className={cn(
                    "text-[10px] sm:text-xs transition-all duration-300 pointer-events-none",
                    "text-purple-600 dark:text-purple-400",
                    copied ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                )}>
                    COPIED!
                </div>
                <button
                    onClick={copy}
                    className={cn(
                        "p-1.5 rounded-md transition-all duration-300 ease-in-out",
                        "hover:bg-purple-100 dark:hover:bg-purple-500/20",
                        copied 
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-neutral-500 hover:text-purple-600 dark:text-neutral-400 dark:hover:text-purple-300"
                    )}
                    aria-label="Copy code"
                >
                    <div className="relative w-3.5 h-3.5 sm:w-4 sm:h-4">
                        <div className={cn(
                            "absolute inset-0 transform transition-all duration-300",
                            copied ? "opacity-0 rotate-45 scale-0" : "opacity-100 rotate-0 scale-100"
                        )}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                        </div>
                        <div className={cn(
                            "absolute inset-0 transform transition-all duration-300",
                            copied ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-45 scale-0"
                        )}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

interface CodeBlockProps {
    code: string;
    language: string;
    className?: string;
}

const getTheme = (isDark: boolean) => ({
    plain: {
        backgroundColor: 'transparent',
        color: isDark ? '#cdd6f4' : '#4c4f69'
    },
    styles: [
        { types: ['keyword', 'builtin'], style: { color: isDark ? '#cba6f7' : '#8839ef' } },
        { types: ['comment'], style: { color: isDark ? '#6c7086' : '#8c8fa1', fontStyle: 'italic' as const } },
        { types: ['class-name', 'function'], style: { color: isDark ? '#89b4fa' : '#1e66f5' } },
        { types: ['string', 'attr-value'], style: { color: isDark ? '#a6e3a1' : '#40a02b' } },
        { types: ['punctuation', 'operator'], style: { color: isDark ? '#89dceb' : '#04a5e5' } },
        { types: ['number', 'constant'], style: { color: isDark ? '#fab387' : '#fe640b' } },
        { types: ['variable'], style: { color: isDark ? '#f5c2e7' : '#ea76cb' } }
    ]
});

export default function CodeBlock({ code, language, className }: CodeBlockProps) {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Safely check if we are in dark mode (accounting for 'system' theme)
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = mounted ? currentTheme === 'dark' : true; 

    return (
        <div className={cn(
            "relative my-6 w-full rounded-lg overflow-hidden border shadow-none",
            "bg-white border-neutral-200", // Tailwind Light mode fallback
            "dark:bg-[#111111] dark:border-neutral-800", // Tailwind Dark mode (Instant CSS)
            className
        )}>
            <CopyButton code={code} language={language} />
            
            <Highlight
                theme={getTheme(isDark)}
                code={code}
                language={language}
            >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre 
                        className={cn(
                            className,
                            monoFont.className,
                            "overflow-x-auto whitespace-pre-wrap break-words",
                            "transition-colors duration-200",
                            "p-4 pt-3", 
                            "text-[13px] sm:text-sm",
                            "bg-transparent" // Forces Prism to inherit our Tailwind background!
                        )}
                        style={{ ...style, backgroundColor: 'transparent', fontFamily: 'inherit' }}
                    >
                        {tokens.slice(0, -1).map((line, i) => (
                            <div key={i} {...getLineProps({ line, className: "leading-6 sm:leading-7" })}>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token })} />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </div>
    );
}