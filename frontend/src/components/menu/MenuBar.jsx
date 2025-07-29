import React,{useState} from "react";
import {Search, Menu, X } from "lucide-react";
function MenuBar(){
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };
    return(
        <nav className="bg-sky-500 text-white py-3 sticky top-0 z-15 h-15  ">
            <ul className="hidden md:flex justify-center content-center gap-x-15 ">
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
                <li className="flex item-center border border-white rounded-3xl px-2 py-1 lg:w-sm" >
                    <input 
                        type ='text' 
                        placeholder="Search Here"
                        className="text-white text-center focus:outline-none md:w-full hidden lg:block "
                    />
                    <Search
                    className="h-5 ml-2 "
                    />
                    </li>
            </ul>

            <div className='flex md:hidden bg-nav pr-5 rounded-2xl justify-end '>
                    {menuOpen && (
                        <div className='md:hidden flex flex-col h-full  py-4 px-2 pl-3 bg-sky-500 rounded-xl gap-0.5 '>
                            <a href="#Home" className=''>Home</a>
                            <a href="#AboutUs" className=''>About Us</a>
                            <a href="#ServicesOverview" className=''>Services</a>
                            <a href="#PatientPortal" className=''>Patient Portal</a>
                            <a href="" className=''>Contact US</a>
                            <Search
                            className="h-5 ml-2 "
                            />
                        </div>
                    )}

                    <button onClick={toggleMenu} className="text-orange-50 focus:outline-none top-0">
                        {menuOpen ? <X size={25} className="text-blue-400" /> : <Menu size={28} className="" />}
                    </button>

                </div>

        </nav>
    );
}

export default MenuBar ;