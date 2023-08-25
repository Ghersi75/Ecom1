import { atom } from "jotai"
import { GenericDataType } from "Utils/Types/dataTypes/GenericDataType"
import { MenuItemsListType } from "Utils/Types/dataTypes/MenuItemsListType"
import { ModifierType } from "Utils/Types/dataTypes/ModifierType"

type dataAtomType = {
  "sections": MenuItemsListType[],
  "modifiers": ModifierType,
  "menuItems": GenericDataType
}

const dataAtom = atom<dataAtomType | undefined>(undefined)
const addMenuItemActive = atom<boolean>(false)
const addMenuItemInformation = atom<any>({})

export { dataAtom, addMenuItemActive, addMenuItemInformation }