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
      const params = ["modifiers", "sections", "menuItems"]
      const link = "https://zypflt0q86.execute-api.us-east-1.amazonaws.com/test"
      const query = link +  "?tables=" + params.join(",")

      console.log(query)
      const response = await fetch(query);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const resData = await response.json();
      setData(resData)
      console.log(data)
      // console.log(`Res data`)
      // console.log(resData)
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
