import React from 'react';
import logo from './logo.svg';
import Navbar from "@Components/Navbar"

function App() {
  return (
    <>
      <div className="flex-1 flex-row p-4">
        <button className="p-1 ml-0 m-2 bg-white text-black rounded-md">
          Button 1
        </button>
        <button className="p-1 m-2 bg-black text-white rounded-md hover:bg-green-300">
          Button 2
        </button>
        <div className="bg-green-500">
          green
        </div>
      </div>
    </>
  );
}

export default App;
