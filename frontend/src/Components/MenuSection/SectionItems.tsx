import { MouseEvent } from "react"
import { testDataType } from "Utils/Types/testDataTypes";
import { useAtom } from "jotai"
import { addMenuItemActive, addMenuItemInformation, dataAtom } from "lib/atom"
import { MenuItemsListType } from "Utils/Types/dataTypes/MenuItemsListType";

// Change props type
function SectionItems(props: {"item": MenuItemsListType}) {
  const [a, setActive] = useAtom(addMenuItemActive)
  const [b, setMenuItems] = useAtom(addMenuItemInformation)
  const [data, _] = useAtom(dataAtom)

  const onClick = (event: MouseEvent, item: any) => {
    console.log(event.currentTarget)
    console.log(item)
    setMenuItems(item)
    setActive(true)
  }

  return(
    <div className="p-4">
      <div className="pl-4 text-xl font-medium">
        {props.item.section_id}
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1">
        {props.item.item_ids && 
          props.item.item_ids.map((item, index) => {
          return(
            <div className="bg-red-500 m-4 rounded-lg flex flex-row justify-between items-center outline outline-4 outline-black hover:outline-rose-500 hover:cursor-pointer" onClick={(e) => onClick(e, item)} key={index}>
              <div className="flex flex-col">
                <h1 className="ml-4">
                  {data?.menuItems}
                  {/* {index} */}
                </h1>
                <h1 className="ml-4">
                  {item.description}
                  {/* {index} */}
                </h1>
                {item.price &&
                (typeof item.price !== "string") &&
                Object.entries(item.price).map(([size, value], index) => {
                  // 'size' will be one of 'sm', 'md', or 'xl', and 'value' will be the corresponding price
                  
                  return (
                    <div className="ml-4 text-sm" key={index}>
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
              
              <img src={item.img} className="h-[200px] w-[200px] object-cover rounded-sm"/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SectionItems