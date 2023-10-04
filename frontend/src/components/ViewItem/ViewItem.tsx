"use client"

import { useState, useEffect, FormEvent, MouseEvent } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card'
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Check, XOctagon } from "lucide-react"
import { BaseModifierOptionsInterface, ViewItemMenuItemInterface, ViewItemModifierInterface } from "@/lib/types/databaseReturnTypes"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@radix-ui/react-label"
import { ViewItemPriceType, ViewItemsCheckboxSelectedStateInterface, ViewItemsRadioSelectedStateInterface, ViewItemsSelectedStateInterface } from "@/lib/types/stateTypes"
import { ScrollArea } from "../ui/scroll-area"
import ViewItemRadio from "./ViewItemRadio"
import ViewItemCheckbox from "./ViewItemCheckbox"
import ViewItemParentContainer from "./ViewItemParentContainer"
import { formatCurrency } from "@/lib/utils"
import ViewItemModifierArea from "./ViewItemModifierArea"
import { Button } from "@/components/ui/button"
import { useAtom } from "jotai"
import { shoppingCart, ShoppingCartType, modifyCartItemSelected } from "@/lib/atoms"

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
  const [selected, setSelected] = useState<ViewItemsSelectedStateInterface>({

  })
  const [modifyCartSelected, setModifyCartSelected] = useAtom(modifyCartItemSelected)
  const [modifyCartSelectedIndex, setModifyCartSelectedIndex] = useState<number | null>(null)
  const [price, setPrice] = useState<string | null>(null)
  const [modifying, setModifying] = useState(false)
  const router = useRouter()

  // console.log("Price: ", price)


  function updatePrice() {
    // console.log("Selected: ", selected)
    let total = 0

    for (let [modifier_id, modifier] of Object.entries(selected)) {
      // console.log(modifier)
      if (modifier.type === "RADIO") { 
        if (modifier.price) {
          // Pricing is always of type string for RADIO since only 1 can be selected
          total += parseFloat(modifier.price)
        }
      } else if (modifier.type === "CHECKBOX") {
        for (let [option_id, option_info] of Object.entries(modifier.selected_ids)) {
          // console.log("option_id: ", option_id, "option_info: ", option_info)
          if ((option_info as any)) {
            const price = (option_info as any).price
            if (typeof price === "string") {
              total += parseFloat(price)
            } else if (price !== null) {
              // [(selected[price.modifier_id] as ViewItemsRadioSelectedStateInterface).selected_id || -1]
              // console.log(price[(selected[price.modifier_id] as ViewItemsRadioSelectedStateInterface).selected_id || -1])
              total += parseFloat(price[(selected[price.modifier_id] as ViewItemsRadioSelectedStateInterface).selected_id || -1])
              // console.log(total)
            }
          }
        }
        // console.log(Object.entries(modifier.selected_ids))

      }
    }

    // console.log(Object.keys(selected))

    setPrice(total > 0 ? formatCurrency(total) : null)
  }

  useEffect(() => {
    getSections(item_id)
    .then(data => {
      // console.log(data)
      setItemData(data)

      // const firstRadio = itemOptionPrice.reduce((min, item) => {
      //   return Math.min(min, parseFloat(item.price));
      // }, Infinity);

      // Initialize `selected` based on the fetched data
      let initialSelected
      if (modifyCartSelected) {
        initialSelected = modifyCartSelected.selected
        setModifyCartSelectedIndex(modifyCartSelected.cart_index)
        setModifyCartSelected(null)
        setModifying(true)
      } else {
        initialSelected = data.modifiers.reduce((acc: any, modifier: any) => {
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
      }
      
      setSelected(initialSelected);


      data.modifiers.forEach((modifier: any) => {
        if (modifier.default_option_id) {
          let basePrice = null
          let display_text = ""
          modifier.modifier_options.forEach((option: any) => {
            if (option.option_id === modifier.default_option_id) {
              basePrice = option.base_price
              display_text = option.display_text
            }
          })
          handleSelectedChange(modifier.modifier_id, modifier.default_option_id, display_text, basePrice)
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

  useEffect(() => {
    updatePrice();
}, [selected]);


  function handleSelectedChange(modifier_id: number, option_id: number, display_text: string, price: ViewItemPriceType) {
    setSelected(prev => {
      const currentModifier = prev[modifier_id]
      // doing let newObj = prev breaks things because it uses the direct reference to prev, which react doesnt like
      // state management relies on immutability, so trying to modify the object directly breaks things
      // theres a reason why there's a setSelected function
      let newObj = { ...prev }

      if (currentModifier.type === "RADIO") {
        newObj = {
          ...prev,
          [modifier_id]: {
            ...currentModifier,
            selected_id: option_id,
            display_text: display_text,
            price: price
          }

        // return {
        //   ...prev,
        //   [modifier_id]: {
        //     ...currentModifier,
        //     selected_id: option_id,
        //     display_text: display_text,
        //     price: price
        //   }
        };
      } else if (currentModifier.type === "CHECKBOX") {
        // Ensure currentModifier is treated as ViewItemsCheckboxSelectedStateInterface
        const checkboxModifier = currentModifier as ViewItemsCheckboxSelectedStateInterface;

        // Check for option_id, newOptionValue will be true if nothing's found, else false
        const currentOptionValue = checkboxModifier.selected_ids[option_id];
        if (currentOptionValue) {
          delete (newObj[modifier_id] as ViewItemsCheckboxSelectedStateInterface).selected_ids[option_id]
        } else {
          newObj = {
            ...prev,
            [modifier_id]: {
              ...checkboxModifier,
              selected_ids: {
                ...checkboxModifier.selected_ids,
                [option_id]: {
                  display_text: display_text,
                  price: price
                }
              }
            }
          }
        }

      }

      // console.log(newObj)
      return newObj; // return the previous state if neither condition is met (just for safety)
    });
}

  const [cart, setCart] = useAtom(shoppingCart)

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const item: ShoppingCartType = {
      selected: selected,
      header: itemData?.display_text || ``,
      quantity: 1,
      price: price === null ? `` : `${price}`,
      item_id: item_id
    }

    if (modifying && modifyCartSelectedIndex) {
      setCart(prev => {
        let newCart = [...prev];
        newCart[modifyCartSelectedIndex] = item;
        return newCart;

        // return [...prev, item]
      })
    } else {
      setCart(prev => {
        return [...prev, item]
      })
    }

    router.push("/")

  }

  console.log(modifyCartSelectedIndex)

  return (
    <ViewItemParentContainer className="z-50">
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
              <Image alt={`Image of ${itemData.display_text}`} src={itemData.image_link} width={200} height={200}/>
            }
            <CardDescription>{itemData.description}</CardDescription>
          </CardHeader>
          <ViewItemModifierArea 
            selected={selected}
            handleSelectedChange={handleSelectedChange}
            itemData={itemData}/>
          <CardFooter  className="flex-none justify-between items-center bg-secondary rounded-b-lg p-4">
            {/* {price === null ? `Card Footer` : `${price}`} */}
            <Button onClick={handleButtonClick}> {modifying ? `Modify order` : `Add to order`} {price === null ? `Card Footer` : `${price}`} </Button>
          </CardFooter>
        </Card>
      }
    </ViewItemParentContainer>
  )
}
