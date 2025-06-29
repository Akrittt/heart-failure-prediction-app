import React,{useState} from 'react';
import Image from "../../assets/logo.png"
import Signup from '../signup/Signup';
import Login from '../signup/Login';


const Header= () =>  {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header 
      className="flex flex-wrap justify-between p-4 ">
      <div 
        className=" flex flex-wrap text-3xl text-sky-500 font-bold pl-8">
          <img src = {Image} className='h-10 pr-2'/>
          <p className='hidden md:block'>HeartCare.ai</p>
        </div>
      <div className="pr-10">
        <button 
          className="bg-sky-500 hover:bg-sky-700 text-white rounded-4xl p-2 pr-5 pl-6 "
          onClick={() => { setIsModalOpen(true); setShowLogin(false); }}
        >Sign In / Register</button>
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
      </div>
    </header>
  );
}

export default Header;
