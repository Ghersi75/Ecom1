import { MenuSectionPropsType } from "../types";
import { MenuItem } from "./MenuItem";

// MenuSection will be each individual section, such as Pizza
export function MenuSection({ section, index }: MenuSectionPropsType ) {
 
  return(
    <div key={index}>
      <p className="text-primary text-lg font-bold">{section?.display_text?.toUpperCase()}</p>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pt-4"> {/* Make this a flex container with wrap */}
        <>
        {section?.items && 
          section.items.map((item: any, _: any) => {
          console.log(item)
          return <MenuItem item={item} />
        })}
        </>
      </div>
    </div>
  )
}