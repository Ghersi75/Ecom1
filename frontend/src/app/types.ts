import { MenuSectionsType } from "@/lib/types/databaseReturnTypes";

export type SearchParamsType = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export type SectionListPropsType = {
  sections: MenuSectionsType[] | null
}

export type MenuSectionPropsType = {
  section: MenuSectionsType,
  index: number
}

export type MenuItemPropsType = {
  item: any
}