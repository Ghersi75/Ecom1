"use client"
import { Button } from "../ui/button";
import { useAtom } from "jotai"
import { darkMode } from "@/lib/atoms"
import { Sun, Moon } from "lucide-react"

export default function LightDarkButton() {
  const [dark, setDark] = useAtom(darkMode)

  return (
    <Button onClick={() => {setDark(prev => !prev)}}>
      {
        dark ?
        <Sun />
        :
        <Moon />
      }
    </Button>
  )
}