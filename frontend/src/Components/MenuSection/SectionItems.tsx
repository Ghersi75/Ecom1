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
            <div className="bg-red-500 rounded-lg flex flex-row justify-between items-center">
              <div className="flex flex-col">
                <h1 className="ml-4">
                  {item.name} {index}
                </h1>
                <h1 className="ml-4">
                  {item.description} {index}
                </h1>
                {Object.entries(item.price).map(([size, value], index) => {
                  // 'size' will be one of 'sm', 'md', or 'xl', and 'value' will be the corresponding price
                  return (
                    <div className="ml-4 text-sm" key={index}>
                      {size}: {value}
                    </div>
                  );
                })}
              </div>
              
              <img src={item.img} className="h-[100%] w-[200px] object-contain"/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SectionItems