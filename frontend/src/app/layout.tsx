import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar/Navbar'
import AuthProvider from '@/context/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pizzeria Website',
  description: 'Online ordering website for pizzeria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`dark ${inter.className}`}>
        <AuthProvider>  
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
