import React, { useState, useEffect } from "react";
import Image from "../../assets/logo.png"
import Signup from '../signup/Signup.jsx';
import Login from '../signup/Login.jsx';
import { useAuth } from '../auth/AuthContext.jsx';
import LogedIn from './LogedIn.jsx';
import {
    Menu,
    X,

} from "lucide-react";
function MenuBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(true); // true for login, false for signup
    const { user } = useAuth();

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden"; // Disable scroll
        } else {
            document.body.style.overflow = "auto"; // Enable scroll
        }
    }, [isModalOpen]);
    return (
        <>
            <nav className="flex justify-between items-center bg-sky-100  text-sky-600 py-3 sticky top-0 z-50 px-5">
                <div
                    className="flex ">
                    <img src={Image} className='h-8 pr-2' />
                    <p className='hidden lg:block text-xl font-bold'>HeartCare.ai</p>
                </div>
                <ul className="hidden md:flex justify-center content-center font-semibold gap-x-15 ">
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
                        <a href="#PatientPortal"
                            className="relative after:block after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ">
                            Patient Portal
                        </a>
                    </li>
                    <li>
                        <a href="#ContactUs"
                            className="relative after:block after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ">
                            Contact Us
                        </a>
                    </li>


                </ul>
                <div className="">
                    {user ? (
                        <LogedIn user={user} />
                    ) : (
                        <button
                            className="bg-sky-500 hover:bg-sky-700 text-white rounded-2xl p-2 pr-5 pl-6 hidden md:block"
                            onClick={() => { setIsModalOpen(true); setShowLogin(true); }}
                        >
                            Sign In / Register
                        </button>
                    )}
                </div>


                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu Panel */}
                {menuOpen && (
                    <div className="absolute top-0 right-0 w-64 h-screen bg-sky-500 text-white shadow-lg p-5 flex flex-col gap-4 md:hidden">
                        {/* Close Button */}
                        <button onClick={closeMenu} className="self-end">
                            <X size={28} className="text-white" />
                        </button>

                        {/* Links */}
                        {["Home", "About Us", "Patient Portal", "Contact Us"].map((item) => (
                            <a
                                key={item}
                                href={`#${item.replace(/\s+/g, "")}`}
                                onClick={closeMenu}
                                className="py-2 text-lg border-b border-sky-300 hover:text-sky-200"
                            >
                                {item}
                            </a>
                        ))}
                        <button
                            className="text-start py-2 text-lg border-b border-sky-300 hover:text-sky-200"
                            onClick={() => {
                                closeMenu();
                                setIsModalOpen(true);
                                setShowLogin(true);
                            }}
                        >Sign Up / Register</button>

                        {/* Auth Button */}
                        {user ? (
                            <LogedIn user={user} />
                        ) : (
                            <button
                                className="mt-4 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl py-2"
                                onClick={() => {
                                    closeMenu();
                                    setIsModalOpen(true);
                                    setShowLogin(false);
                                }}
                            >
                                Sign Up / Register
                            </button>
                        )}
                    </div>
                )}

            </nav>

            {/* Auth Modal */}
            {isModalOpen && (
                
                <div className="fixed inset-0 flex items-center justify-center bg-gray-200/30 backdrop-blur-sm  bg-opacity-50 z-50 overflow-auto">
                    {showLogin ? (
                        <Login onClose={() => setIsModalOpen(false)} onSwitch={() => setShowLogin(false)} />
                    ) : (
                        <Signup onClose={() => setIsModalOpen(false)} onSwitch={() => setShowLogin(true)} />
                    )}

                </div>
            )}

        </>

    );
}

export default MenuBar;