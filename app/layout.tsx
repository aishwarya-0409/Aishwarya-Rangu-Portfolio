// app/layout.tsx

import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import DesktopOnlyMessage from '@/components/desktop-only-message'

export const metadata: Metadata = {
  title: 'Aishwarya Shivakumar Rangu | Portfolio',
  description: 'Portfolio of Aishwarya Shivakumar Rangu',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // 👇 Apply the font variables to the className here
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <DesktopOnlyMessage />
        <div className="hidden md:block">
          {children}
        </div>
      </body>
    </html>
  )
}