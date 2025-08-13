import React, { useState, useEffect,useRef } from 'react';
import { useAuth } from '../auth/AuthContext';
import { LogOut } from 'lucide-react';
const LogedIn = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);
    const { setUser } = useAuth();
    const handlelogout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        window.location.reload();

    }
    const UserIcon = ({ letter }) => (
        <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold shadow-md cursor-pointer transform hover:scale-110 transition-transform duration-300">
            {letter}
        </div>
    );
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileMenuRef]);

    return (
        <div className="hidden md:flex items-center space-x-4" ref={profileMenuRef}>
            <span className="font-medium text-sky-900 text-lg">Hi, {user.name}</span>
            <div onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                <UserIcon letter={user.name.charAt(0)} />
            </div>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
                <div className="origin-top-right absolute top-15 right-5 mt-2 w-30 rounded-md shadow-lg text-amber-100 bg-red-600 hover:bg-red-800 focus:outline-none z-10">
                    <div className="py-1">
                        <button onClick={handlelogout} className="flex items-center px-4 py-2 text-sm  w-full text-left" role="menuitem">
                            <LogOut />
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LogedIn;