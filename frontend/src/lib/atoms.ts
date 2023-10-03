import { atom } from "jotai"
import { ViewItemsSelectedStateInterface } from "@/lib/types/stateTypes"

export const darkMode = atom<boolean>(true)

export type ShoppingCartType = {
  selected: ViewItemsSelectedStateInterface
  quantity: number
  header: string
  // Already formatted
  price: string
  item_id: string
}

export const shoppingCart = atom<ShoppingCartType[]>([])

export type ModifyCartItemSelectedType = {
  selected: ViewItemsSelectedStateInterface,
  cart_index: number
}

export const modifyCartItemSelected = atom<ModifyCartItemSelectedType | null>(null)