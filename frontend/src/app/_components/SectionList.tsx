import { MenuSectionsType } from "@/lib/types/databaseReturnTypes";
import { MenuSection } from "./MenuSection";
import { SectionListPropsType } from "../types";

// SectionList will be the container for all the sections. This will be the highest level for sections and will display sections such as Pizzas, Drinks, and Desserts
export function SectionList({ sections }: SectionListPropsType) {
  // console.log(sections)

  if (sections == null) {
    return null
  }

  return (
    <>
      {sections.map((section: MenuSectionsType, index: number) => {
        return <MenuSection section={section} index={index} />
      })} 
    </>
  )
}