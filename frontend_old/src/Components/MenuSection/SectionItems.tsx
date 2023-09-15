import { MouseEvent } from "react"
import { testDataType } from "Utils/Types/testDataTypes";
import { useAtom } from "jotai"
import { addMenuItemActive, addMenuItemInformation, dataAtom } from "lib/atom"
import { MenuItemsListType } from "Utils/Types/dataTypes/MenuItemsListType";

// Change props type
function SectionItems(props: {"item": MenuItemsListType | any}) {
  const [, setActive] = useAtom(addMenuItemActive)
  const [, setMenuItems] = useAtom(addMenuItemInformation)
  const [data, ] = useAtom(dataAtom)

  const onClick = (event: MouseEvent, item: any) => {
    // console.log(event.currentTarget)
    // console.log(item)
    setMenuItems(item)
    setActive(true)
  }

  // console.log(props.item)

  return(
    <div className="p-4">
      <div className="pl-4 text-xl font-medium">
        {props.item.name}
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1">
        {props.item.item_ids && 
          props.item.item_ids.map((item: any, index: number) => {
          if (data?.menuItems && item in data?.menuItems) {
            const currItem = data.menuItems[item]
            // console.log(currItem)
            return(
              <div className="bg-red-500 m-4 rounded-lg flex flex-row justify-between items-center outline outline-4 outline-black hover:outline-rose-500 hover:cursor-pointer" onClick={(e) => onClick(e, item)} key={index}>
                <div className="flex flex-col">
                  <h1 className="ml-4">
                    {/* {data?.menuItems} */}
                    {/* {index} */}
                    {currItem.name}
                  </h1>
                  <h1 className="ml-4">
                    {currItem.description}
                    {/* {index} */}
                  </h1>
                  {currItem.price &&
                  (typeof currItem.price !== "string") &&
                  Object.entries(currItem.price).map(([size, value], i) => {
                    // 'size' will be one of 'sm', 'md', or 'xl', and 'value' will be the corresponding price
                    
                    return (
                      <div className="ml-4 text-sm" key={i}>
                        {size}: {value}
                      </div>
                    );
                  })}
  
                  {item.price &&
                  (typeof item.price === "string") &&
                  <div className="ml-4 text-sm" key={index}>
                    ${item.price}
                  </div>
                  }
                </div>
                
                <img src={currItem.image_link} className="h-[200px] w-[200px] object-cover rounded-sm"/>
              </div>
            )
          }
            return (
              <>
                
              </>
            )
        })}
      </div>
    </div>
  )
}

export default SectionItems