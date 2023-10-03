"use client"

import { ShoppingCartType } from '@/lib/atoms'
import { ViewItemsCheckboxSelectedStateInterface, ViewItemsModifierType } from '@/lib/types/stateTypes'
import React from 'react'
import { useRouter } from "next/navigation"
import { useAtom } from "jotai"
import { shoppingCart, modifyCartItemSelected } from "@/lib/atoms"

export default function ShoppingCartCard({ item } : { item: ShoppingCartType | undefined }) {
  if (!item) {
    return null
  }

  const router = useRouter()
  const [cart, setCart] = useAtom(shoppingCart)
  const [modifyCartSelected, setModifyCartSelected] = useAtom(modifyCartItemSelected)

  const handleModify = () => {
    setModifyCartSelected({
      selected: item?.selected,
      cart_index: cart.indexOf(item)
    })
    router.push(`/?productId=${item.item_id}`)
  }

  const handleRemove = () => {
    setCart(prev => {
      const newCart = [...prev]
      delete newCart[newCart.indexOf(item)]

      return newCart
    })
  }

  return (
    <div>
      <div className="flex flex-col divide-y p-4">
        <div className="bg-primary-foreground p-2.5">
          <header className="flex flex-row justify-between p-2.5">
            <h1 className="font-sans">{item.header}</h1>
            <h1> {item.price} </h1>
          </header>
          <ul>
            {
              Object.entries(item.selected).map(([modifier_id, modifier]: [string, ViewItemsModifierType], index: number) => {
                if (modifier.type === "RADIO") {
                  return(
                    <li>
                      {
                        modifier.display_text
                      }
                    </li>
                  )
                }

                return(
                  Object.entries(modifier).map(([option_id, option]: [string, ViewItemsCheckboxSelectedStateInterface], idx: number) => {
                    return(
                      Object.values(option).map((i, id) => {
                        return(
                          <li>
                            {i.display_text}
                          </li>
                        )
                      })
                    )
                  })
                )
              })
            }
          </ul>
          <footer className="flex flex-row p-2.5 justify-start gap-2 text-sm">
            <h1 className="hover:underline hover:cursor-pointer" onClick={handleModify}> Modify </h1>
            <h1 className="hover:underline hover:cursor-pointer" onClick={handleRemove}> Remove </h1>
          </footer>
        </div>
      </div>
    </div>
  )
}
