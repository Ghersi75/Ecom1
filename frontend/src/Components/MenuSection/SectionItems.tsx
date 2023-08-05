import { testDataType } from "Utils/Types/testDataTypes";

function SectionItems(props: testDataType) {
  return(
    <div className="p-4">
      <div>
        {props.section}
      </div>
      <div className="grid grid-cols-2">
        {props.items.map((item, index) => {
          return(
            <div className="p-4 bg-red-500 rounded-lg">
              {item.name} {index}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SectionItems