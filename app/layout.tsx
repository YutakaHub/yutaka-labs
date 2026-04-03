import type { Metadata } from 'next'
import Box from '@mui/material/Box'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v1X-appRouter'
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
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AppThemeProvider>
            <Header />
            <Box component="main" sx={{ minHeight: 'calc(100vh - 6.5rem)' }}>
              {children}
            </Box>
            <Footer />
          </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
