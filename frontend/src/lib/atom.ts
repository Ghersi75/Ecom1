import { atom } from "jotai"

const dataAtom = atom<any>([])
const addMenuItemActive = atom<boolean>(false)
const addMenuItemInformation = atom<any>({})

export { dataAtom, addMenuItemActive, addMenuItemInformation }