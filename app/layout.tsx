import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { AppThemeProvider } from '@/components/providers/app-theme-provider'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://yutaka-labs.vercel.app'),
  title: {
    default: 'Yutaka Labs',
    template: '%s | Yutaka Labs',
  },
  description: 'ポートフォリオと技術ブログ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <AppThemeProvider>
          <Header />
          <main className="min-h-[calc(100vh-7.5rem)]">{children}</main>
          <Footer />
        </AppThemeProvider>
      </body>
    </html>
  )
}
