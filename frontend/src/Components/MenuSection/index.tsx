// import { MenuSectionPropsType } from "Types/PropsTypes/MenuSectionPropsType"
import { testData } from "Utils/testData"
import { useEffect } from "react";
import { useAtom } from "jotai";
import { dataAtom } from "lib/atom"
import SectionItems from "Components/MenuSection/SectionItems"

// props: MenuSectionPropsType
function MenuSection(props: any) {
  const [data, _] = useAtom(dataAtom);

  useEffect(() => {
    // console.log(data);
  }, [data]);
  
  console.log(data)
  return (
    <div className="grid grid-cols-1 h-auto gap-9 bg-green-300 col-start-1 col-end-4">
      {/* {
        data.map((item: any, index: number) => {
          return <p> {item.section_id} </p>
        })
      } */}
      {
        data[0] && 
        data.map((item: any, index: any) => {
          return <SectionItems {...item} key={index} />
        })
      }
    </div>
  );
}

export default MenuSection;
