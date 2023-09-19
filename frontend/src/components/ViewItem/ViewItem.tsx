"use client"

import { useState, useEffect, MouseEvent } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card'
import { useRouter } from "next/navigation"

async function getSections() {
  const res = await fetch("http://localhost:3333/menu/sections", {
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
  productId
} : {
  productId: string
}) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>()
  const router = useRouter()

  function handleBackgroundClick(e: MouseEvent<HTMLElement>) {
    e.preventDefault()
    if (e.target === e.currentTarget) {
      console.log("Parent")
      router.push("/")
    } else {
      console.log("Not")
    }
  }

  useEffect(() => {
    getSections()
    .then(data => {
      console.log("ViewItems data: ", data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-80" onClick={handleBackgroundClick}>
      {
        loading ?
        <Card className="">
          <div>Loading ... </div>
        </Card> 
        :
        <Card className="hover:border-primary hover:cursor-pointer">
          <CardHeader>
            <CardTitle>Test {productId}</CardTitle>
            <CardDescription> Description {productId}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      }
    </div>
  )
}
