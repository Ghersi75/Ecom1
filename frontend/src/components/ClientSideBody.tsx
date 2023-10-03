"use client"

import { HTMLProps, ReactNode } from "react"
import { Inter } from 'next/font/google'
import { useAtom } from "jotai"
import { darkMode } from "@/lib/atoms"

const inter = Inter({ subsets: ['latin'] })

interface PropsInterface extends HTMLProps<HTMLDivElement> {
  children: ReactNode
}

export default function Body({
  className,
  children,
}: PropsInterface) {
  const [dark, _] = useAtom(darkMode)

  return(
    <body className={`${dark ? "dark" : "light"} ${className} ${inter.className}`}>
      {children}
    </body>
  )
}