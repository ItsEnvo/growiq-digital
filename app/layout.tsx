import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Preloader from './components/Preloader'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'GrowIQ Digital - AI Agents for Local Businesses',
  description: 'Full AI workforce that handles reception, sales, follow-up, scheduling, support, reviews, content, social media, reporting, and marketing. Never miss a lead again.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Playfair+Display:wght@400;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  )
}