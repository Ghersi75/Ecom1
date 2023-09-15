import { useState } from "react"
import { useAtom } from "jotai"
import { addMenuItemActive, addMenuItemInformation, dataAtom } from "lib/atom"
import React from "react"

function AddItemMenu(props: any) {
  const [active, setActive] = useAtom(addMenuItemActive)
  const [menuInfo, setMenuInfo] = useAtom(addMenuItemInformation)
  const [menuData, ] = useAtom(dataAtom)
  const [currItemSelection, setCurrItemSelection] = useState<any>({})

  const currItem = menuData?.menuItems[menuInfo]

  // console.log(currItem)

  // console.log("Here", menuData)

  const onClick = () => {
    setActive(false)

    console.log("Clicked", active)
  }

  const BG = (props: any) => {
    return(
      <div className={`fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100vw] h-[100vh] bg-slate-800 opacity-50 z-[5] cursor-pointer ${active ? "" : "hidden"}`} onClick={onClick}>
  
      </div>
    )
  }

  const handleClick = (e: any) => {
    console.log(e)
  }

  const Modifier = (props: { modifier:any }) => {
    const [size, setSize] = useState<"sm" | "md" | "xl">("sm")
    // console.log("Modifier prop", props.modifier)
    // console.log("Modifier section", currItem)
    return(
      <div>
        {props.modifier?.header}
        <form>
        {
          props.modifier?.choices &&
          props.modifier.choices.map((item: any, index: number) => {
            return(
              <div key={index}>
                {/* <div className="w-[16px] h-[16px] outline-1 outline-black outline rounded-full flex justify-center items-center"> 
                  <div className=" w-[9px] h-[9px] bg-black rounded-full"></div>
                </div> */}
                {item?.name} 
                {
                  item?.price?.linked_price ? 
                    (currItem as any)?.price[item?.price?.linked_price]
                    :
                    item?.price?.[size]
                }
              </div>
            )
          })
        }
        </form>
        
      </div>
    )
  }

  // console.log(menuInfo) 

  return(
    <> 
      <BG />
      <div className={`fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[780px] h-[90vh] bg-slate-50 z-10 opacity-100 rounded-xl flex flex-col ${active ? "" : "hidden"}`}>
        
        <div className="flex items-center justify-between h-[80px] rounded-t-xl bg-slate-200 px-[20px] font-black text-3xl">
          {currItem && currItem?.name?.toUpperCase()}
          <div className="p-[10px] rounded-full hover:cursor-pointer" onClick={onClick}>
            X
          </div>
        </div>
        
        <div className="flex flex-grow flex-col bg-red-200 overflow-y-auto ">
          {
            currItem?.modifiers.include && 
            currItem?.modifiers.include.map((item, index) => {
              return(<Modifier modifier={menuData?.modifiers[item]} key={index} />)
            })
          }

        </div>
        
        <div className="flex items-center justify-between h-[80px] w-[100%] rounded-b-xl bg-slate-200 px-[20px] font-black text-3xl">
          {currItem && `$${currItem?.price.default}`}
        </div>
      </div>
    </>
    
  )
}

export default AddItemMenu
