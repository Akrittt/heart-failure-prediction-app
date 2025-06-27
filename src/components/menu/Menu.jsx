import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
function Menu(){
    return(
        <nav className="bg-sky-500 text-white font-normal py-3">
            <ul className="flex flex-row justify-center content-center gap-x-15 ">
                <li>
                    <a href="" 
                        className="relative after:block after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ">
                        Home
                    </a>
                </li>
                <li>
                    <a href="" 
                        className="relative after:block after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ">
                        Services
                    </a>
                </li>
                <li>
                    <a href="" 
                        className="relative after:block after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ">
                        Doctors
                    </a>
                </li>
                <li>
                    <a href="" 
                        className="relative after:block after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ">
                        Patient Portal
                    </a>
                </li>
                <li>
                    <a href="" 
                        className="relative after:block after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ">
                        Contact Us
                    </a>
                </li>
                <li className="flex item-center border border-white rounded-3xl px-2 py-1 w-xl max-w-md" >
                    <input 
                        type ='text' 
                        placeholder="Search Here"
                        className="text-white text-center focus:outline-none w-full max-w-md  "
                    />
                    <MagnifyingGlassIcon
                    className="h-5 ml-2 "
                    />
                    </li>
            </ul>

        </nav>
    );
}

export default Menu ;