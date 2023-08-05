import React from 'react';
import logo from './logo.svg';
import Navbar from "Components/Navbar"
import MenuSection from "Components/MenuSection"

function App() {
  return (
    <div className="h-[300vh]">
      <Navbar />
      <div className="h-16" />
      <MenuSection />
    </div>
  );
}

export default App;
