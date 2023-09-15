import { useEffect } from 'react'; // added useEffect
import { useAtom } from "jotai";
import { dataAtom } from "lib/atom"
import logo from './logo.svg';
import Navbar from "Components/Navbar";
import MenuSection from "Components/MenuSection";
import Cart from "Components/Cart";

function App() {
  const [data, setData] = useAtom(dataAtom);

  const fetchData = async () => { // renamed to avoid shadowing the fetch global
    try {
      // const params = ["modifiers", "sections", "menuItems"]
      const params = ["menuTable"]
      const link = "https://zypflt0q86.execute-api.us-east-1.amazonaws.com/test"
      const query = link +  "?tables=" + params.join(",")

      // console.log(query)
      const response = await fetch(query);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const resData = await response.json();
      // console.log(resData)
      const transformedData: any = {};

      for (const entry of resData.menuTable) {
        // console.log(entry);
        if (entry.table_id === "sections") {
          const arr: any = []
          console.log(entry.items)
          entry.items && Object.keys(entry.items).forEach((element: any) => {
            
            arr.push({
              "name": element,
              ...entry.items[element]
            })
          });
          // Sort array
          const compare = ( a: any, b: any ) => {
            if ( a.sorting_key < b.sorting_key ){
              return -1;
            }
            if ( a.sorting_key > b.sorting_key ){
              return 1;
            }
            return 0;
          }

          arr.sort( compare );
          // console.log(arr)
          transformedData[entry.table_id] = arr
          // transformedData[entry.table_id] = entry.items ? entry.items : entry.table_id
        } else {
          transformedData[entry.table_id] = entry.items ? entry.items : entry.table_id
        }
        // If you need to do async operations here, you can use await:
        // await someAsyncFunction(entry);
      }

      setData(transformedData)
      console.log(transformedData)

      // Add section sorting at some point once more sections are added

    } catch (error) {
      if (error instanceof Error) {
          console.error("There was a problem with the fetch operation:  ", error.message);
      } else {
          console.error("There was a problem with the fetch operation:", error);
      }
  }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <Navbar />
      <div className="h-16" />
      <div className="grid grid-cols-4">
        <MenuSection/>
        <Cart/>
      </div>
    </div>
  );
}

export default App;
