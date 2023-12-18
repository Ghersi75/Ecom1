import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils";
import { MenuItemPropsType } from "../types";

// TODO Fix the type and the entire function
export function MenuItem({ item }: MenuItemPropsType) {
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
}