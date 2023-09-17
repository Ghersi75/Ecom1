import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar/Navbar'
import AuthProvider from '@/context/AuthProvider'
import Body from '@/components/ClientSideBody'


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
      <Body>
        <AuthProvider>  
          <Navbar />
          {children}
        </AuthProvider>
      </Body>
    </html>
  )
}
