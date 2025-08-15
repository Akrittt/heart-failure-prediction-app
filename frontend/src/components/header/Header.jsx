import React, { useState } from 'react';
import Image from "../../assets/logo.png"
import Signup from '../signup/Signup.jsx';
import Login from '../signup/Login.jsx';
import { useAuth } from '../auth/AuthContext.jsx';
import LogedIn from '../menu/LogedIn.jsx';

const Header = (isLoggedin) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useAuth();
  console.log(isLoggedin); // Log the isLoggedin prop
  return (
    <header

      className="flex flex-wrap justify-between p-4 ">
      <div
        className=" flex flex-wrap text-3xl text-sky-500 font-bold pl-8">
        <img src={Image} className='h-10 pr-2' />
        <p className='hidden md:block'>HeartCare.ai</p>
      </div>
      <div className="pr-10">
        {user ? (
          <LogedIn user={user} />
        ) : (
          <>
            <button
              className="bg-sky-500 hover:bg-sky-700 text-white rounded-2xl p-2 pr-5 pl-6"
              onClick={() => { setIsModalOpen(true); setShowLogin(false); }}
            >
              Sign In / Register
            </button>
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                {showLogin ? (
                  <Login
                    onClose={() => setIsModalOpen(false)}
                    onSwitch={() => setShowLogin(false)}
                  />
                ) : (
                  <Signup
                    onClose={() => setIsModalOpen(false)}
                    onSwitch={() => setShowLogin(true)}
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
