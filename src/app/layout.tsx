import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ui/theme/theme-provider'
import { cn } from '@/lib/utils/utils'
import { ogImages } from '@/lib/og/og-images'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  metadataBase: new URL('https://subhodeeps.vercel.app'),
  title: 'subhodeep | home',
  description: 'academic website, cv and stuff',
  openGraph: {
    images: ogImages('home'),
  },
  twitter: {
    card: 'summary_large_image',
    images: ogImages('home'),
  },
  verification: { 
    google: "JfvlM1XeQizWzQrb51mAuBNk0wpUeRdKKxJ9Voq0BHc" }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={cn(
        "h-full bg-background transition-colors duration-300"
      )}>
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
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}

