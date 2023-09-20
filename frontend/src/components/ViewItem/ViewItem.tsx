"use client"

import { useState, useEffect, MouseEvent } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card'
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Check, XOctagon } from "lucide-react"
import { BaseModifierOptionsInterface, ViewItemMenuItemInterface, ViewItemModifierInterface } from "@/lib/types/databaseReturnTypes"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@radix-ui/react-label"
import { ViewItemsSelectedStateInterface } from "@/lib/types/stateTypes"
import { ScrollArea } from "../ui/scroll-area"
import ViewItemRadio from "./ViewItemRadio"
import ViewItemCheckbox from "./ViewItemCheckbox"

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
    radios: { }, 
    checkboxes: { }
  })
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

  function handleRadioChange(modifierName: string, optionName: string) {
    setSelected(prev => ({
      ...prev,
      radios: {
        ...prev.radios,
        [modifierName]: optionName
      }
    }));
  }

  function handleCheckboxChange(modifierName: string, optionName: string) {
    setSelected(prev => ({
      ...prev,
      checkboxes: {
        ...prev.checkboxes,
        [modifierName]: {
          ...(prev.checkboxes[modifierName] || {}),
          [optionName]: !(prev.checkboxes[modifierName]?.[optionName] || false)
        }
      }
    }));
  }
  
    

  return (
    <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-80" onClick={handleBackgroundClick}>
      {
        loading ?
        <Card className="w-[80%] h-[80%] flex justify-center items-center">
          <div className="animate-spin">Loading ... </div>
        </Card> 
        :
        itemData ? 
        <Card className="hover:border-primary flex flex-col w-[80%] h-[80%]">
          <CardHeader className="flex-none bg-secondary rounded-t-lg">
            <div className="flex flex-row justify-between items-center">
              <CardTitle>{itemData.display_text}</CardTitle>
              <XOctagon className="hover:cursor-pointer" size={36} onClick={() => {router.push("/")}} />
            </div>
            {
              itemData.image_link ?
              <Image alt={`Image of ${itemData.display_text}`} src={itemData.image_link}/>
              : 
              null
            }
            <CardDescription>{itemData.description}</CardDescription>
          </CardHeader>
          <ScrollArea className="flex flex-grow">
            <CardContent>
              {
                itemData.modifiers && itemData.modifiers.length > 0 && 
                itemData.modifiers.map((modifier: ViewItemModifierInterface, index: number) => {
                  return (
                    <div key={index}>
                    {
                      modifier.modifier_options && modifier.modifier_options.length > 0 ? 
                      <>
                        <h1 className="p-2 text-lg">{modifier.display_text}</h1>
                        {
                          modifier.modifier_type === "RADIO" ? 
                          <RadioGroup>
                            {modifier.modifier_options.map((modifier_option: BaseModifierOptionsInterface, i: number) => {
                              return (
                                <ViewItemRadio 
                                  modifier={modifier.name}
                                  option_name={modifier_option.name}
                                  option_text={modifier_option.display_text}
                                  handleRadioChange={handleRadioChange}
                                  selected={selected}
                                  />
                              )
                            })}
                          </RadioGroup>
                          : 
                          modifier.modifier_type === "CHECKBOX" ?
                          <div className="flex flex-col gap-2">
                            {modifier.modifier_options.map((modifier_option: BaseModifierOptionsInterface, i: number) => {
                              return (
                                <ViewItemCheckbox 
                                  modifier={modifier.name}
                                  option_name={modifier_option.name}
                                  option_text={modifier_option.display_text}
                                  handleCheckboxChange={handleCheckboxChange}
                                  selected={selected}
                                  />
                              )
                            })}
                          </div>
                          :
                          null
                        }
                      </>
                      : 
                      null
                    }
                    </div>
                  )
                })
              }
            </CardContent>
          </ScrollArea>
          <CardFooter  className="flex-none bg-secondary rounded-b-lg p-4">
            Card Footer
          </CardFooter>
        </Card>
        : 
        null
      }
    </div>
  )
}
