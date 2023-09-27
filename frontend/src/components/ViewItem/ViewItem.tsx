"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card'
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Check, XOctagon } from "lucide-react"
import { BaseModifierOptionsInterface, ViewItemMenuItemInterface, ViewItemModifierInterface } from "@/lib/types/databaseReturnTypes"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@radix-ui/react-label"
import { ViewItemsCheckboxSelectedStateInterface, ViewItemsRadioSelectedStateInterface, ViewItemsSelectedStateInterface } from "@/lib/types/stateTypes"
import { ScrollArea } from "../ui/scroll-area"
import ViewItemRadio from "./ViewItemRadio"
import ViewItemCheckbox from "./ViewItemCheckbox"
import ViewItemParentContainer from "./ViewItemParentContainer"
import ViewItemScrollArea from "./ViewItemScrollArea"

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

function getPrice(selected: ViewItemsSelectedStateInterface): number | null {
  console.log("Selected: ", selected)
  return null
}

export default function ViewItem({ 
  item_id
} : {
  item_id: string
}) {
  const [loading, setLoading] = useState(true)
  const [itemData, setItemData] = useState<ViewItemMenuItemInterface | undefined>()
  const [selected, setSelected] = useState<ViewItemsSelectedStateInterface>({

  })
  const [price, setPrice] = useState<number | null>(getPrice(selected))
  const router = useRouter()

  useEffect(() => {
    getSections(item_id)
    .then(data => {
      // console.log(data)
      setItemData(data)

      // const firstRadio = itemOptionPrice.reduce((min, item) => {
      //   return Math.min(min, parseFloat(item.price));
      // }, Infinity);

      // Initialize `selected` based on the fetched data
      const initialSelected = data.modifiers.reduce((acc: any, modifier: any) => {
        if (modifier.modifier_type === "RADIO") {
          acc[modifier.modifier_id] = {
            type: "RADIO",
            selected_id: null,
          };
        } else if (modifier.modifier_type === "CHECKBOX") {
          acc[modifier.modifier_id] = {
            type: "CHECKBOX",
            selected_ids: {},
          };
        }
        return acc;
      }, {});
      
      setSelected(initialSelected);

      data.modifiers.forEach((modifier: any) => {
        if (modifier.default_option_id) {
          handleSelectedChange(modifier.modifier_id, modifier.default_option_id)
        }
      })

      setLoading(false)
    }).catch(e => 
      {
        console.log(e)
        router.push("/")
      }
    )
  }, [])

  function handleSelectedChange(modifier_id: number, option_id: number) {
    setSelected(prev => {

      const currentModifier = prev[modifier_id];

      if (currentModifier.type === "RADIO") {
        return {
          ...prev,
          [modifier_id]: {
            ...currentModifier,
            selected_id: option_id
          }
        };
      } else if (currentModifier.type === "CHECKBOX") {
        // Ensure currentModifier is treated as ViewItemsCheckboxSelectedStateInterface
        const checkboxModifier = currentModifier as ViewItemsCheckboxSelectedStateInterface;

        // Check for option_id, newOptionValue will be true if nothing's found, else false
        const currentOptionValue = checkboxModifier.selected_ids[option_id];
        const newOptionValue = !currentOptionValue;

        return {
          ...prev,
          [modifier_id]: {
            ...checkboxModifier,
            selected_ids: {
              ...checkboxModifier.selected_ids,
              [option_id]: newOptionValue
            }
          }
        };
      }

      return prev; // return the previous state if neither condition is met (just for safety)
    });
}


  return (
    <ViewItemParentContainer>
      {
        loading ?
        <Card className="w-[80%] h-[80%] flex justify-center items-center">
          <div className="animate-spin">Loading ... </div>
        </Card> 
        :
        itemData &&
        <Card className="hover:border-primary flex flex-col w-[80%] h-[80%]">
          <CardHeader className="flex-none bg-secondary rounded-t-lg">
            <div className="flex flex-row justify-between items-center">
              <CardTitle>{itemData.display_text}</CardTitle>
              <XOctagon className="hover:cursor-pointer" size={36} onClick={() => {router.push("/")}} />
            </div>
            {
              itemData.image_link &&
              <Image alt={`Image of ${itemData.display_text}`} src={itemData.image_link}/>
            }
            <CardDescription>{itemData.description}</CardDescription>
          </CardHeader>
          <ViewItemScrollArea 
            selected={selected}
            handleSelectedChange={handleSelectedChange}
            itemData={itemData}/>
          <CardFooter  className="flex-none bg-secondary rounded-b-lg p-4">
            {price === null ? `Card Footer` : `$${price}`}
          </CardFooter>
        </Card>
      }
    </ViewItemParentContainer>
  )
}
