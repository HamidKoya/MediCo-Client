import React from "react";

function Header() {
  return (
    <div className="w-full  bg-cyan-900 border-b-[1px] border-white">
      <div className="flex items-center justify-between p-1">
        <div className="flex items-center text-white sm:ml-10">
          <button className="flex items-center  hover:hover:bg-black/5 rounded-lg active:scale-95 p-2">
            <img src="/logo.png" alt="" className="sm:w-9 w-6 sm:h-9 h-6" />
            <h1 className="text-xl font-semibold ml-2">MediCo</h1>
          </button>
        </div>
        <div>
          <h1 className="text-white font-bold text-2xl">ADMIN</h1>
        </div>
        <div className="sm:mr-10">
            <button className="text-white font-semibold  hover:hover:bg-black/5 rounded-lg active:scale-95 p-2">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
