// src/app/layout.tsx
//
// The root layout, the counterpart of Jekyll's _layouts/default.html: every page
// of the site is rendered inside it. It writes the <html> and <body> tags, sets
// the default font and the site-wide metadata, and switches between the light and
// dark themes. Each folder can add its own layout.tsx, which is placed inside
// this one, as one Jekyll layout can name another as its parent.
import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ui/theme/theme-provider'
import { cn } from '@/lib/utils/utils'
import { monoFont } from '@/styles/fonts/fonts'
import { ogImages } from '@/lib/og/og-images'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

// Site-wide metadata, like the defaults in _config.yml. Next.js turns it into the
// <title> and <meta> tags in <head>. A layout.tsx further down can override any
// of it; the pages without their own metadata use these values.
export const metadata: Metadata = {
  // The site's address, used to turn relative image paths into full URLs
  metadataBase: new URL('https://subhodeeps.vercel.app'),
  title: 'subhodeep | home',
  description: 'academic website, cv and stuff',
  // Link previews on social media and chat apps (see src/lib/og/og-images.ts)
  openGraph: {
    images: ogImages('home'),
  },
  twitter: {
    card: 'summary_large_image',
    images: ogImages('home'),
  },
  // Proves to Google Search Console that the site is yours
  verification: {
    google: "JfvlM1XeQizWzQrb51mAuBNk0wpUeRdKKxJ9Voq0BHc" }
}

/**
 * Wraps every page. `children` is the page being shown, like {{ content }} in a
 * Jekyll layout.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // suppressHydrationWarning: the theme script changes the class of <html>
    // before React starts in the browser, which would otherwise trigger a warning
    <html lang="en" className="h-full" suppressHydrationWarning>
      {/* monoFont (JetBrains Mono) is the default font for everything */}
      <body className={cn(
        "h-full bg-background transition-colors duration-300",
        monoFont.className
      )}>
        {/* Reads the visitor's light or dark preference and puts class="dark"
            on <html> when needed, which switches every dark:... class */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen relative">
            <div className="flex-1 flex flex-col">
              <main className="container mx-auto mt-4 px-4 flex-1">
                {children}
              </main>
            </div>
          </div>
          {/* Vercel's visitor counts and page-speed measurements */}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
