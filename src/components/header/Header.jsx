import React from 'react';
function Header() {
  return (
    <header 
      className="max-w flex items-stretch content-around justify-between gap-x-10 h-20 p-5  ">
      <div 
        className="text-3xl text-sky-500 font-bold pl-8">HeartCare.ai</div>
      <div className="pr-10">
        <button className="bg-sky-500 hover:bg-sky-700 text-white rounded-4xl p-2 pr-5 pl-6 ">Sign In / Register</button>
      </div>
    </header>
  );
}

export default Header;
