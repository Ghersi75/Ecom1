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
import { Footer } from "./_components";
import { SectionList } from "./_components/SectionList";

export default async function Home({ searchParams } : SearchParamsType) {
  const productId = searchParams.productId
  const [error, sections]= await getSections()
  // console.log(sections)

  // TODO Fix this later
  if (error) {
    return (
      <div>
        Error lol
      </div>
    )
  }
  
  return (
    <main className="">
      { productId ? <ViewItem item_id={typeof productId === "string" ? productId : ""}/> : null }
      <div className="flex min-h-[calc(100vh - var(--navbar-height))] max-h-fit flex-row">
        <div className="flex flex-col grow gap-4 p-8 2xl:p-16">
          <SectionList sections={sections} />
        </div> 
        <ShoppingCart />
      </div>
      <Footer />
    </main>
  )
}
