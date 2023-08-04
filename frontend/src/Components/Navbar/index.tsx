import React from 'react';
import logo from './logo.svg';

function Navbar() {
  return (
    <div className="fixed h-16 w-screen bg-green-500">
      <div className="flex h-full flex-row justify-between items-center px-5">
        <div>
          Home
        </div>
        <div>
          Sign In
        </div>
      </div>
    </div>
  );
}

export default Navbar;
