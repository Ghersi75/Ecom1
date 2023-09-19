import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ViewItem from "@/components/ViewItem/ViewItem";

import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react";

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

type Generated<T> = T

async function Test(a: any) {
  if (a) {
    await new Promise(resolve => setTimeout(resolve, 1000))
  
  }
  
  return (
    <div> test </div>
  )
}

export default async function Home({ 
  searchParams
} : {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const productId = searchParams.productId
  let productInfo
  
  if (productId) {
    productInfo = await fetch("http://localhost:3333/menu/sections", {
      "method": "GET"
    })
  }

  console.log(productId)

  const sections: {
    section_id: number,
    name: string,
    display_name: string,
    display_order: number,
    is_active: boolean,
    is_available: boolean,
    items: {
      item_id: Generated<number>,
      name: string,
      display_name: string,
      description: string | null,
      image_link: string | null,
      base_price: string | null,
      display_order: Generated<number>,
      is_active: Generated<number>,
      is_available: Generated<number>,
      is_featured: Generated<number>,
  }[] | undefined
  }[] | undefined = await getSections()

  console.log(sections)

  return (
    <main className="mt-16">
      {
        productId ? 
        <ViewItem productId={productId as string}/>
        :
        null
      }

      {
        sections && sections?.length > 0 ? 
        <div className="flex flex-col gap-4 p-8 lg:p-16">
          {sections.map((section, index) => {
            return (
              <div key={index}>
                <p className="text-primary text-lg font-bold">{section.display_name.toUpperCase()}</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4"> {/* Make this a flex container with wrap */}
                  {section.items && 
                    section.items.map((item: any, _) => {
                    return(
                      <Link
                        href={`/?productId=${item.item_id}`}>
                        <Card className="flex flex-row justify-between hover:border-primary hover:cursor-pointer" key={encodeURIComponent(item.item_id)}>
                          <div>
                            <CardHeader>
                              <CardTitle>{item.display_name} {item.item_id}</CardTitle>
                              <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p>Card Content</p>
                            </CardContent>
                            <CardFooter>
                              <p>Card Footer</p>
                            </CardFooter>
                          </div>
                          <Image className="rounded-r-lg" alt={`Image of ${item.display_name}`} src={`https://i0.wp.com/picjumbo.com/wp-content/uploads/yummy-and-tasty-salami-pizza-diavola-close-up-free-photo.jpg?w=600&quality=80`} width={200} height={200}/>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div> 
        : 
        null
      }
    </main>
)

}
