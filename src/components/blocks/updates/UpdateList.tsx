// src/components/blocks/updates/UpdateList.tsx
//
// A list of updates, as on the homepage and the Older Updates page: each line is
// an icon followed by "[date] text", sliding in a moment after the line above.
// The updates come from src/content/updates.md, by way of
// src/lib/updates/updates.ts. It runs in the browser ('use client' below) for the
// animation.
'use client'

import { motion } from 'framer-motion'
import {
    Apple,
    BookOpen,
    Brain,
    Briefcase,
    Dot,
    FileText,
    Presentation,
    Video,
    type LucideIcon,
} from 'lucide-react'
import Text from '@/components/ui/text/text'
import { InlineLinks, newTabProps, wholeLink } from '@/components/ui/inline-links/inline-links'
import type { Update } from '@/lib/updates/updates'

// The icon for each kind of update; an unknown or missing kind gets a dot
const icons: Record<string, LucideIcon> = {
    job: Briefcase,
    preprint: FileText,
    paper: BookOpen,
    notes: BookOpen,
    talk: Presentation,
    video: Video,
    event: Apple,
    degree: Brain,
}

// The look of links in the updates
const link = 'text-accent hover:underline'

/** A link in the accent colour; links to other websites open in a new tab */
function UpdateLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a href={href} {...newTabProps(href)} className={link}>
            {children}
        </a>
    )
}

/**
 * "[date] text". An update that is a single link is shown whole in the accent
 * colour, date included; otherwise the text is grey, with any links in it in the
 * accent colour.
 */
function UpdateText({ date, text }: { date: string; text: string }) {
    const whole = wholeLink(text)
    if (whole) return <UpdateLink href={whole.href}>{`[${date}] ${whole.text}`}</UpdateLink>
    return (
        <>
            {`[${date}] `}
            <InlineLinks text={text} linkClassName={link} />
        </>
    )
}

/** One line: the icon, then the text, sliding in after `delay` seconds */
function UpdateLine({
    icon: Icon,
    delay,
    children,
}: {
    icon: LucideIcon
    delay: number
    children: React.ReactNode
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="flex items-center gap-3"
        >
            <Icon aria-hidden className="h-4 w-4 shrink-0 text-accent-muted" />
            <Text variant="muted" size="smaller">
                {children}
            </Text>
        </motion.div>
    )
}

/**
 * The list of updates.
 *
 * @param updates    the updates, newest first
 * @param startDelay seconds before the first line slides in
 * @param step       seconds between one line and the next (0.1 unless given)
 * @param footer     an optional last line, such as the link to the Older Updates
 *                   page, given as its icon, text and address
 */
export function UpdateList({
    updates,
    startDelay = 0,
    step = 0.1,
    footer,
}: {
    updates: Update[]
    startDelay?: number
    step?: number
    footer?: { icon: LucideIcon; text: string; href: string }
}) {
    return (
        <div className="flex flex-col gap-2 sm:gap-4">
            {updates.map((update, i) => (
                <UpdateLine
                    key={`${update.date}-${i}`}
                    icon={icons[update.kind] ?? Dot}
                    delay={startDelay + i * step}
                >
                    <UpdateText date={update.date} text={update.text} />
                </UpdateLine>
            ))}
            {footer && (
                <UpdateLine icon={footer.icon} delay={startDelay + updates.length * step}>
                    <UpdateLink href={footer.href}>{footer.text}</UpdateLink>
                </UpdateLine>
            )}
        </div>
    )
}
