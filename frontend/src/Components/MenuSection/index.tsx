import { MenuSectionPropsType } from "Types/PropsTypes/MenuSectionPropsType"
import { testData } from "Utils/testData"

function MenuSection(props: MenuSectionPropsType) {
  return (
    <div className="flex flex-column">
      <h1>
        {props.sectionTitle}
      </h1>
      <div className="flex flex-row">
        {testData[0].items[0].description}
      </div>
    </div>
  );
}

export default MenuSection;
