// import { MenuSectionPropsType } from "Types/PropsTypes/MenuSectionPropsType"
import { testData } from "Utils/testData"
import SectionItems from "Components/MenuSection/SectionItems"

// props: MenuSectionPropsType
function MenuSection() {
  return (
    <div className="grid grid-cols-1 h-96 bg-green-300">
      {
        testData.map((item, index) => {
          return <SectionItems {...item} key={index} />
        })
      }
    </div>
  );
}

export default MenuSection;
