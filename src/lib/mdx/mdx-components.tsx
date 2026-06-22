'use client'

import { MDXComponents } from 'mdx/types'
import Ruler from '@/components/ui/ruler/ruler'
import { cn } from '@/lib/utils/utils'
import { monoFont } from '@/styles/fonts/fonts'
import CodeBlock from '@/components/blocks/code-block/code-block'

export const mdxComponents: MDXComponents = {
    // Headings - Clean margins and crisp white text
    h1: ({ children }) => (
        <h1 className={cn("mt-10 mb-6 text-2xl sm:text-3xl font-bold tracking-tight text-foreground dark:text-white")}>
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className={cn("mt-8 mb-4 text-xl sm:text-2xl font-bold tracking-tight text-foreground dark:text-gray-100", monoFont.className)}>
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className={cn("mt-6 mb-4 text-lg sm:text-xl font-semibold tracking-tight text-foreground dark:text-gray-200", monoFont.className)}>
            {children}
        </h3>
    ),
    h4: ({ children }) => (
        <h4 className={cn("mt-6 mb-4 text-base sm:text-lg font-semibold tracking-tight text-foreground dark:text-gray-200", monoFont.className)}>
            {children}
        </h4>
    ),

    // Paragraphs - Tall line height and soft gray color exactly like the screenshot
    p: ({ children }) => (
        <p className={cn("mb-6 text-[15px] sm:text-base leading-loose sm:leading-[1.8] text-neutral-700 dark:text-gray-300", monoFont.className)}>
            {children}
        </p>
    ),

    // Lists - Proper hanging indents, spaced items, and dimmed markers
    ul: ({ children }) => (
        <ul className={cn("mb-6 ml-6 list-disc space-y-3 text-[15px] sm:text-base leading-loose sm:leading-[1.8] text-neutral-700 dark:text-gray-300 marker:text-neutral-500", monoFont.className)}>
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className={cn("mb-6 ml-6 list-decimal space-y-3 text-[15px] sm:text-base leading-loose sm:leading-[1.8] text-neutral-700 dark:text-gray-300 marker:text-neutral-500", monoFont.className)}>
            {children}
        </ol>
    ),
    li: ({ children }) => (
        <li className={cn("pl-2", monoFont.className)}>
            {children}
        </li>
    ),

    // Inline text styling
    strong: ({ children }) => (
        <strong className={cn("font-bold text-foreground dark:text-white", monoFont.className)}>
            {children}
        </strong>
    ),
    em: ({ children }) => (
        <span className={cn("italic text-muted-foreground dark:text-gray-400", monoFont.className)}>
            {children}
        </span>
    ),
    
    // Strip the default pre tag completely to fix double-box issues
    pre: ({ children }) => (
        <>{children}</>
    ),

    // Code blocks and inline code
    code: ({ children, className }) => {
        const match = /language-(\w+)/.exec(className || '');
        const language = match ? match[1] : '';

        if (!language) {
            // Purple inline code styling + Monospace
            return (
                <code className={cn(
                    monoFont.className,
                    "px-1.5 py-0.5 mx-0.5 my-0.5",
                    "bg-purple-100/80 dark:bg-purple-900/40",
                    "text-purple-800 dark:text-purple-200",
                    "rounded-md text-[0.85em]",
                    "inline-block leading-normal"
                )}>
                    {children}
                </code>
            );
        }

        return (
            <div className="my-8">
                <CodeBlock 
                    code={children as string} 
                    language={language} 
                />
            </div>
        );
    }, 

    // Blockquotes
    blockquote: ({ children }) => (
        <blockquote className={cn(
            "pl-4 border-l-2 border-purple-500/50",
            "my-6 italic",
            "text-muted-foreground/90 dark:text-gray-400",
            monoFont.className
        )}>
            {children}
        </blockquote>
    ),
    
    // Ruler
    hr: () => <Ruler color="gray" marginTop="lg" marginBottom="lg" />,

    // Links - Subtle purple underline that matches your aesthetic
    a: ({ href, children }) => (
        <a 
            href={href} 
            className={cn(
                "text-foreground dark:text-gray-200 font-medium",
                "transition-colors duration-200",
                "underline underline-offset-4",
                "decoration-purple-500/50 hover:decoration-purple-400",
                monoFont.className
            )}
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
            {children}
        </a>
    ),
}