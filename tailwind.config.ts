// /** @type {import('tailwindcss').Config} */

// Theme colours are CSS variables in src/app/globals.css, stored as HSL channels
// so that opacity modifiers such as bg-accent-muted/10 work.
const hsl = (name: string) => `hsl(var(--${name}) / <alpha-value>)`

// The amore.mplstyle palettes, as classes such as text-amore-teal-ink.
const amore = Object.fromEntries(
  ['red', 'amber', 'olive', 'green', 'teal', 'blue', 'plum', 'slate'].map((palette) => [
    palette,
    Object.fromEntries(
      ['ink', 'main', 'light', 'shade'].map((tone) => [tone, hsl(`amore-${palette}-${tone}`)])
    ),
  ])
)

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // This registers your mono font so you can use class="font-mono"
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        border: hsl('border'),
        input: hsl('input'),
        ring: hsl('ring'),
        background: hsl('background'),
        foreground: hsl('foreground'),
        primary: {
          DEFAULT: hsl('primary'),
          foreground: hsl('primary-foreground')
        },
        secondary: {
          DEFAULT: hsl('secondary'),
          foreground: hsl('secondary-foreground')
        },
        destructive: {
          DEFAULT: hsl('destructive'),
          foreground: hsl('destructive-foreground')
        },
        muted: {
          DEFAULT: hsl('muted'),
          foreground: hsl('muted-foreground')
        },
        // Accent text (links), muted (icons, underlines) and subtle (tinted backgrounds)
        accent: {
          DEFAULT: hsl('accent'),
          muted: hsl('accent-muted'),
          subtle: hsl('accent-subtle')
        },
        popover: {
          DEFAULT: hsl('popover'),
          foreground: hsl('popover-foreground')
        },
        card: {
          DEFAULT: hsl('card'),
          foreground: hsl('card-foreground')
        },
        amore
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: 0
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: 0
          }
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
