import { HTMLProps, MouseEvent, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface PropsInterface extends HTMLProps<HTMLDivElement> {
  children: ReactNode
}

export default function ViewItemParentContainer({ 
  className,
  children
}: PropsInterface) {
  const router = useRouter()

  function handleBackgroundClick(e: MouseEvent<HTMLElement>) {
    e.preventDefault()
    // Check if its the parent only getting clicked, aka the background around the card
    if (e.target === e.currentTarget) {
      router.push("/")
    }
  }

  return (
    <div className={cn(`h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-80`, className)} onClick={handleBackgroundClick}>
      {children}
    </div>
  )
}
