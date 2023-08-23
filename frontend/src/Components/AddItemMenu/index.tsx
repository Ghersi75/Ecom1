import react from "react"
import { useAtom } from "jotai"
import { addMenuItemActive, addMenuItemInformation } from "lib/atom"

function AddItemMenu(props: any) {
  const [active, setActive] = useAtom(addMenuItemActive)
  const [menuInfo, setMenuInfo] = useAtom(addMenuItemInformation)

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

  console.log(menuInfo)

  return(
    <> 
      <BG />
      <div className={`fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[780px] h-[90vh] bg-slate-50 z-10 opacity-100 rounded-xl flex flex-col ${active ? "" : "hidden"}`}>
        
        <div className="flex items-center justify-between h-[80px] rounded-t-xl bg-slate-200 px-[20px] font-black text-3xl">
          {menuInfo && menuInfo?.name?.toUpperCase()}
          <div className="p-[10px] rounded-full hover:cursor-pointer" onClick={onClick}>
            X
          </div>
        </div>
        
        <div className="flex flex-grow flex-col bg-red-200 overflow-y-auto ">

        </div>
        
        <div className="flex items-center justify-between h-[80px] w-[100%] rounded-b-xl bg-slate-200 px-[20px] font-black text-3xl">
          {menuInfo && `$${menuInfo?.price}`}
        </div>
      </div>
    </>
    
  )
}

export default AddItemMenu
