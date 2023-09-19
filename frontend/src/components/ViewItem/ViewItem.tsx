"use client"

import { useState, useEffect, MouseEvent } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card'
import { useRouter } from "next/navigation"
import Image from "next/image"
import { XOctagon } from "lucide-react"
import { ViewItemMenuItemInterface } from "@/lib/types/databaseReturnTypes"

async function getSections(item_id: string) {
  const res = await fetch(`http://localhost:3333/menu/item/${item_id}`, {
    method: "GET",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return null
    // throw new Error('Failed to fetch data')
  }
 
  return await res.json()
}

export default function ViewItem({ 
  item_id
} : {
  item_id: string
}) {
  const [loading, setLoading] = useState(true)
  const [itemData, setItemData] = useState<ViewItemMenuItemInterface | undefined>()
  const router = useRouter()

  function handleBackgroundClick(e: MouseEvent<HTMLElement>) {
    e.preventDefault()
    // Check if its the parent only getting clicked, aka the background around the card
    if (e.target === e.currentTarget) {
      router.push("/")
    }
  }

  useEffect(() => {
    getSections(item_id)
    .then(data => {
      console.log(data)
      setItemData(data)
      setLoading(false)
    }).catch(e => 
      {
        console.log(e)
        router.push("/")
      }
    )
  }, [])

  return (
    <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-80" onClick={handleBackgroundClick}>
      {
        loading ?
        <Card className="w-[80%] h-[80%] flex justify-center items-center">
          <div className="animate-spin">Loading ... </div>
        </Card> 
        :
        itemData ? 
        <Card className="hover:border-primary w-[80%] h-[80%]">
          <CardHeader>
            <CardTitle>{itemData.display_text}</CardTitle>
            <XOctagon className="hover:cursor-pointer" onClick={() => {router.push("/")}} />
            {
              itemData.image_link ?
              <Image alt={`Image of ${itemData.display_text}`} src={itemData.image_link}/>
              : 
              null
            }
            <CardDescription>{itemData.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        : 
        null
      }
    </div>
  )
}
