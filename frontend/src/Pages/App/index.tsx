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
      const response = await fetch('https://q6kyb4s3p1.execute-api.us-east-1.amazonaws.com/Test'); // replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const resData = await response.json();
      // console.log(resData)

      // Additional safety check for the type
      try {
        const responseBody = JSON.parse(resData.body);
        console.log(responseBody)
        if (Array.isArray(responseBody)) {
          const itemList = responseBody || [];
          setData(itemList);
          // console.log(itemList);
        } else {
          console.error("Unexpected response format.");
        }
      } catch (error) {
        console.error("Error parsing response body:", error);
      }

    } catch (error) {
      if (error instanceof Error) {
          console.error("There was a problem with the fetch operation:", error.message);
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
