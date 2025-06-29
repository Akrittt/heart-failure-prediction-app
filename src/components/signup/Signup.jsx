import React from "react";
import Image from "../../assets/login.jpg";
import { FcGoogle } from "react-icons/fc";

export default function Signup({ onClose , onSwitch }) {
    return(
         <div className="fixed inset-0 bg-gray-200/20 backdrop-blur flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-4 text-gray-500 text-2xl hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Signup</h2>
        

        {/* Form */}
        <form className="space-y-4">
          <div className="flex space-x-4">
            <input
            type="text"
            placeholder="First name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Last name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>

          <input
            type="text"
            placeholder="Hospital Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email or Username"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-sky-400 hover:bg-sky-600 text-white py-2 rounded-md font-semibold"
          >
            Register Now
          </button>
        </form>

        {/* Already have account */}
        <div className="text-center text-sm text-gray-600 mt-4">
          Already have account?{' '}
          <button onClick={onSwitch} className="text-blue-600 underline cursor-pointer">Login here</button>
        </div>

        {/* OR Divider */}
        <div className="my-4 border-t border-gray-200 text-center text-sm text-gray-500"></div>

        {/* Google button */}
        
          <div className=" flex justify-center bg-white text-black py-2 rounded-xl shadow-gray-200 hover:bg-gray-200 font-medium">
            <FcGoogle  className=" h-7 mr-2"/>
            <button className="" >
            Continue with Google
            </button>
          </div>
      </div>
    </div>
    );
}

