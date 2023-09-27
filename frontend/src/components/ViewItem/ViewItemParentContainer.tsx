import { MouseEvent, ReactNode } from "react"
import { useRouter } from "next/navigation"



export default function ViewItemParentContainer({ 
  children
}: {
  children: ReactNode
}) {
  const router = useRouter()

  function handleBackgroundClick(e: MouseEvent<HTMLElement>) {
    e.preventDefault()
    // Check if its the parent only getting clicked, aka the background around the card
    if (e.target === e.currentTarget) {
      router.push("/")
    }
  }

  return (
    <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-80" onClick={handleBackgroundClick}>
      {children}
    </div>
  )
}
