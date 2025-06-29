import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
function Menu(){
    return(
        <nav className="bg-sky-500 text-white font-normal py-3 sticky top-0 z-15 ">
            <ul className="flex flex-wrap justify-center content-center gap-x-15 ">
                <li>
                    <a href="#Home" 
                        className="relative after:block after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ">
                        Home
                    </a>
                </li>

                <li>
                    <a href="#AboutUs" 
                        className="relative after:block after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ">
                        About Us
                    </a>
                </li>

                <li>
                    <a href="#ServicesOverview" 
                        className="relative after:block after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ">
                        Services
                    </a>
                </li>
                
                <li>
                    <a href="#PatientPortal" 
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
                <li className="flex item-center border border-white rounded-3xl px-2 py-1 max-w-md md:w-xl" >
                    <input 
                        type ='text' 
                        placeholder="Search Here"
                        className="text-white text-center focus:outline-none md:w-full  "
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