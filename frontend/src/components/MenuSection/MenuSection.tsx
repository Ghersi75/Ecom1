import { MenuSectionsType } from '@/lib/types/databaseReturnTypes'
import { formatCurrency } from '@/lib/utils'
import { Link } from 'lucide-react'
import Image from "next/image"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

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

export default async function MenuSection() {
  const sections: MenuSectionsType[] | undefined = await getSections()

  return await (
    <>
    {
      sections && sections?.length > 0 ? 
      <div className="flex flex-col gap-4 p-8 lg:p-16">
        {sections.map((section, index) => {
          return (
            <div key={index}>
              <p className="text-primary text-lg font-bold">{section?.display_text?.toUpperCase()}</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4"> {/* Make this a flex container with wrap */}
                {section.items && 
                  section.items.map((item: any, _: any) => {
                  console.log(item)
                  return(
                    <Link
                      href={`/?productId=${item.item_id}`}>
                      <Card className="flex flex-row justify-between hover:border-primary hover:cursor-pointer h-44" key={encodeURIComponent(item.item_id)}>
                        <div className="flex flex-col justify-between">
                          <CardHeader>
                            <CardTitle>{item.display_text}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                          </CardHeader>
                          {
                            (item.base_price || item.display_price) && 
                            <CardFooter>
                              <p>{`Price ${item.base_price ? formatCurrency(item.base_price) : formatCurrency(item.display_price)}`}</p>
                            </CardFooter>
                          }
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
    </>
  )
}
