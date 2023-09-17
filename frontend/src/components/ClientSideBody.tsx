"use client"

import { Inter } from 'next/font/google'
import { useAtom } from "jotai"
import { darkMode } from "@/lib/atoms"

const inter = Inter({ subsets: ['latin'] })

export default function Body({
  children,
}: {
  children: React.ReactNode
}) {
  const [dark, _] = useAtom(darkMode)

  return(
    <body className={`${dark ? "dark" : "light"} ${inter.className}`}>
      {children}
    </body>
  )
}