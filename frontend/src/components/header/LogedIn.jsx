import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const LogedIn = ({ user }) => {
    const { setUser } = useAuth();
    const handlelogout = () => {
        localStorage.removeItem("authToken");   
        setUser(null);
        window.location.reload();  
         
    }
    return (
        <div className="flex space-x-4 items-center">
            <div>
                <span className="text-gray-700 font-semibold">
                    Welcome, {user.name}!
                </span>
            </div>
            <button onClick={handlelogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-102"
            >logout</button>
        </div>
    );
}

export default LogedIn;