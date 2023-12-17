import ShoppingCart from "@/components/ShoppingCart/ShoppingCart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ViewItem from "@/components/ViewItem/ViewItem";
import { MenuSectionsType } from "@/lib/types/databaseReturnTypes";
import { formatCurrency } from "@/lib/utils";

import Image from "next/image"
import Link from "next/link"
import { getSections } from "./helpers";
import { SearchParamsType } from "./types";

export default async function Home({ searchParams } : SearchParamsType) {
  const productId = searchParams.productId
  const [error, sections]= await getSections()
  console.log(sections)

  return (
    <main className="">
      {
        productId ? 
        <ViewItem item_id={typeof productId === "string" ? productId : ""}/>
        :
        null
      }

      <div className="flex min-h-[calc(100vh - var(--navbar-height))] max-h-fit flex-row">
        <div className="flex flex-col grow gap-4 p-8 2xl:p-16">
        {
          sections && sections?.length > 0 ? 
            sections.map((section: MenuSectionsType, index: number) => {
              return (
                <div key={index}>
                  <p className="text-primary text-lg font-bold">{section?.DisplayName?.toUpperCase()}</p>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pt-4"> {/* Make this a flex container with wrap */}
                    {section?.items && 
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
            })
            : 
            null
          }
          </div> 
        <ShoppingCart />
      </div>
      <footer className="p-16 bg-slate-700 h-[200vh]">
        Footer
      </footer>
    </main>
)

}
