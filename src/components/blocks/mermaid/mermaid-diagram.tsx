// src/components/blocks/mermaid/mermaid-diagram.tsx
//
// A diagram in a post, written as a fenced block whose language is "mermaid";
// https://mermaid.js.org describes the syntax of flowcharts, sequence diagrams
// and the rest. The mermaid library draws the diagram in the browser, so the
// 'use client' line below is needed. The library is large, so it is fetched
// only on pages that have a diagram. The diagram takes its colours from the
// site's own, the CSS variables in src/app/globals.css, and is drawn again when
// the theme changes.
'use client'

import { useEffect, useId, useState } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils/utils'

/**
 * A colour of the site, such as --accent, as #rrggbb, which mermaid needs. The
 * variables hold hue, saturation and lightness, as in "271 35% 40%".
 */
function siteColour(name: string): string {
    const [h, s, l] = getComputedStyle(document.documentElement)
        .getPropertyValue(`--${name}`)
        .trim()
        .split(/\s+/)
        .map(parseFloat)

    // The usual conversion from hue, saturation and lightness to red, green, blue
    const a = (s / 100) * Math.min(l / 100, 1 - l / 100)
    const channel = (n: number) => {
        const k = (n + h / 30) % 12
        const value = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
        return Math.round(255 * value)
            .toString(16)
            .padStart(2, '0')
    }
    return `#${channel(0)}${channel(8)}${channel(4)}`
}

/**
 * The diagram. Until it has been drawn, an empty space holds its place.
 *
 * @param code the text of the fenced block, in mermaid's syntax
 */
export default function MermaidDiagram({ code }: { code: string }) {
    const { resolvedTheme } = useTheme()
    const id = `mermaid-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
    const [svg, setSvg] = useState('')

    useEffect(() => {
        // The theme is known only once the page is running in the browser
        if (!resolvedTheme) return
        let stale = false

        const draw = async () => {
            const { default: mermaid } = await import('mermaid')
            mermaid.initialize({
                startOnLoad: false,
                theme: 'base',
                darkMode: resolvedTheme === 'dark',
                fontFamily: getComputedStyle(document.body).fontFamily,
                themeVariables: {
                    fontSize: '14px',
                    background: siteColour('background'),
                    textColor: siteColour('foreground'),
                    // Boxes: the tinted accent of inline code, with an accent border
                    primaryColor: siteColour('accent-subtle'),
                    primaryBorderColor: siteColour('accent'),
                    primaryTextColor: siteColour('foreground'),
                    secondaryColor: siteColour('muted'),
                    tertiaryColor: siteColour('background'),
                    // Arrows and the labels on them
                    lineColor: siteColour('muted-foreground'),
                    edgeLabelBackground: siteColour('background'),
                },
            })
            const { svg } = await mermaid.render(`${id}-${resolvedTheme}`, code.trim())
            if (!stale) setSvg(svg)
        }
        draw()

        // A newer drawing, after a change of theme, replaces this one
        return () => {
            stale = true
        }
    }, [code, id, resolvedTheme])

    return (
        <div
            className={cn('my-8 flex justify-center overflow-x-auto', !svg && 'min-h-40')}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    )
}
