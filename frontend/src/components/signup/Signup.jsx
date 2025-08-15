import React, { useState } from "react";
import Image from "../../assets/login.jpg";
import { FcGoogle } from "react-icons/fc";

const Message = ({ text, type }) => {
  const baseClasses = "p-4 rounded-md text-center text-sm font-medium mb-4 w-full";
  const typeClasses = {
    error: "bg-red-100 text-red-700",
    success: "bg-green-100 text-green-700",
  };
  return <div className={`${baseClasses} ${typeClasses[type]}`}>{text}</div>;
};

//otp handler
const OtpModal = ({ isOpen, onClose, onSubmit, email, loading, message }) => {
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp);
  };

  return (
    <div className="fixed inset-0 bg-gray-200/80 bg-opacity-50 flex items-center justify-center z-50">
      <div className=" bg-sky-800 p-8 rounded-2xl shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <h2 className="text-3xl font-bold text-center text-white mb-2">Verify Your Email</h2>
        <p className="text-center text-gray-300 mb-8">
          An OTP has been sent to {email}.
        </p>
        {message && <Message text={message.text} type={message.type} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="otp">
              Enter OTP
            </label>
            <input
              className="w-full px-4 py-3 bg-gray-400 border border-gray-500 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-sky-500"
              type="text"
              id="otp"
              placeholder="XXXXXX"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full bg-blue-400 hover:bg-blue-700 text-amber-50 font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify & Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function Signup({ onClose, onSwitch }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    hospital_name: '',
    email: '',
    password: '',
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const verificationData = {
            email: formData.email,
        };

        // Basic validation
        if (!formData.firstname || !formData.lastname || !formData.hospital_name || !formData.email || !formData.password) {
            setMessage({ text: "Please fill out all fields", type: "error" });
            setLoading(false);
            return;
        }
        console.log(verificationData);
        try {
            const response = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(verificationData),
            });
            
            
            const data = await response.text();
            
            if (response.ok) {
                setMessage({ text: data || "OTP sent successfully!", type: "success" });
                setIsModalOpen(true); // Open the modal
            } else {
                setMessage({ text: data || "Signup failed!", type: "error" });
            }
        } catch (error) {
            setMessage({ text: "An error occurred. Please try again later.", type: "error" });
            console.error("Error during signup:", error);
        } finally {
            setLoading(false);
        }
    };

  const handleVerifyOtp = async (otp) => {
        setLoading(true);
        setMessage(null);
        
        const verificationData = {
            ...formData,
            otp: otp,
        };

        try {
            const response = await fetch('http://localhost:8080/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(verificationData),
            });

            const responseText = await response.text();
            if (!response.ok) throw new Error(responseText);

            setMessage({ type: 'success', text: 'Registration successful! Please sign in.' });
            setIsModalOpen(false);
            
            // Close the modal after a short delay
            setTimeout(() => {
                onSwitch();
            }, 2000);

        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

  return (

    <div className="inset-0  items-center justify-center bg-white rounded-xl shadow-2xl shadow-gray-800  p-5 flex flex-col  relative">

      <OtpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleVerifyOtp}
        email={formData.email}
        loading={loading}
        message={message}
      />

      {/* Close Button */}
      <button
        className="absolute top-3 right-4 text-gray-500 text-2xl hover:text-sky-600"
        onClick={onClose}
      >
        &times;
      </button>

      {/* Header */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
      <p className="text-center text-gray-500 mb-8">Sign up to get started</p>

      {message && <Message text={message.text} type={message.type} />}


      {/* Form */}
      <form className="space-y-4" onSubmit={handleSignUp}>
        <div className="flex space-x-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              placeholder="John"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              placeholder="Deo"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Hospital Name
        </label>
        <input
          type="text"
          id="hospital_name"
          value={formData.hospital_name}
          onChange={handleInputChange}
          placeholder="All India Institute of Medical Sciences(AIIMS)"
          className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="you@gmail.com"
          className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing up..." : "Sign Up"}
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

      <div className=" flex justify-center w-full bg-white text-black py-2 rounded-xl shadow-gray-200 hover:bg-gray-200 font-medium">
        <FcGoogle className=" h-7 mr-2" />
        <button className="" >
          Continue with Google
        </button>
      </div>
    </div>

  );
}

