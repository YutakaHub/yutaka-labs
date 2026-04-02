import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
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
  openGraph: {
    title: 'Yutaka Labs',
    description: 'ポートフォリオと技術ブログ',
    siteName: 'Yutaka Labs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yutaka Labs',
    description: 'ポートフォリオと技術ブログ',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-zinc-100">
        <Header />
        <main className="min-h-[calc(100vh-8rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
