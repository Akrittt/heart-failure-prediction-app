import React, { useState } from "react";
import Image from "../../assets/login.jpg";
import { FcGoogle } from "react-icons/fc";

const Message = ({ text, type }) => {
  const baseClasses = "p-4 rounded-md text-center text-sm font-medium mb-4";
  const typeClasses = {
    error: "bg-red-100 text-red-700",
    success: "bg-green-100 text-green-700",
  };
  return <div className={`${baseClasses} ${typeClasses[type]}`}>{text}</div>;
};

export default function Signup({ onClose, onSwitch }) {
  const [formData, setFormData] = useState({ firstname: "", lastname: "", hospital_name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [hospital_name, setHospitalName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstname: firstname,
      lastname: lastname,
      hospital_name: hospital_name,
      email: email,
      password: password,
    };


    if (!formData.firstname || !formData.lastname || !formData.hospital_name || !formData.email || !formData.password) {
      setMessage("Please fill out all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),

      });
      console.log("Request Body:", JSON.stringify(formData));
      console.log("Response:", response);
      const data = await response.text();
      if (response.ok) {
        setMessage({ text: data || "Registration successful!", type: "success" });
        setTimeout(() => {
          onSwitch();
        }, 2000);
      } else {
        setMessage({ text: data || "Registration failed. Please try again.", type: "error" });
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Error during signup:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-200/20 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative">
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
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            type="text"
            value={hospital_name}
            onChange={(e) => setHospitalName(e.target.value)}
            placeholder="Hospital Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <div className=" flex justify-center bg-white text-black py-2 rounded-xl shadow-gray-200 hover:bg-gray-200 font-medium">
          <FcGoogle className=" h-7 mr-2" />
          <button className="" >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

