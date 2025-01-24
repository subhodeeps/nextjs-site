import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ui/theme/theme-provider'
import { cn } from '@/lib/utils/utils'
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'subhodeep | home',
  description: 'academic website, cv and stuff',
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
		<Analytics />
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

