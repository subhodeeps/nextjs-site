// tailwind.config.ts
//
// Design settings for Tailwind CSS. Tailwind reads every .ts and .tsx file listed
// under `content`, finds the utility classes used in className="...", and writes
// CSS for exactly those classes. This file adds the site's own names to the
// built-in ones, so that classes such as text-accent or bg-amore-teal-shade exist.
// See docs/for-jekyll-users.md for how utility classes work.

// The next line tells code editors which settings are allowed in this file
// /** @type {import('tailwindcss').Config} */

// Theme colours are CSS variables in src/app/globals.css, stored as HSL channels
// so that opacity modifiers such as bg-accent-muted/10 work. hsl('accent') makes
// the text that Tailwind needs: "hsl(var(--accent) / <alpha-value>)".
const hsl = (name: string) => `hsl(var(--${name}) / <alpha-value>)`

// The amore.mplstyle palettes, as classes such as text-amore-teal-ink. This builds
// { red: { ink: ..., main: ..., light: ..., shade: ... }, amber: { ... }, ... }
// for all eight palettes, instead of writing the 32 entries out by hand.
const amore = Object.fromEntries(
    ['red', 'amber', 'olive', 'green', 'teal', 'blue', 'plum', 'slate'].map((palette) => [
        palette,
        Object.fromEntries(
            ['ink', 'main', 'light', 'shade'].map((tone) => [
                tone,
                hsl(`amore-${palette}-${tone}`),
            ]),
        ),
    ]),
)

module.exports = {
    // Dark-theme classes (dark:...) apply when the <html> element has class="dark",
    // which the theme toggle sets
    darkMode: ['class'],
    // The files Tailwind scans for class names
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        // `extend` adds to Tailwind's built-in values instead of replacing them
        extend: {
            fontFamily: {
                // This registers your mono font so you can use class="font-mono"
                mono: ['var(--font-mono)', 'monospace'],
            },
            // Each name here becomes a colour for every colour utility: text-accent,
            // bg-accent, border-accent and so on. DEFAULT is the bare name (text-accent),
            // and the other keys add a suffix (text-accent-muted).
            colors: {
                border: hsl('border'),
                input: hsl('input'),
                ring: hsl('ring'),
                background: hsl('background'),
                foreground: hsl('foreground'),
                primary: {
                    DEFAULT: hsl('primary'),
                    foreground: hsl('primary-foreground'),
                },
                secondary: {
                    DEFAULT: hsl('secondary'),
                    foreground: hsl('secondary-foreground'),
                },
                destructive: {
                    DEFAULT: hsl('destructive'),
                    foreground: hsl('destructive-foreground'),
                },
                muted: {
                    DEFAULT: hsl('muted'),
                    foreground: hsl('muted-foreground'),
                },
                // Accent text (links), muted (icons, underlines) and subtle (tinted backgrounds)
                accent: {
                    DEFAULT: hsl('accent'),
                    muted: hsl('accent-muted'),
                    subtle: hsl('accent-subtle'),
                },
                popover: {
                    DEFAULT: hsl('popover'),
                    foreground: hsl('popover-foreground'),
                },
                card: {
                    DEFAULT: hsl('card'),
                    foreground: hsl('card-foreground'),
                },
                amore,
            },
            // Corner rounding for rounded-lg, rounded-md and rounded-sm
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [],
}
