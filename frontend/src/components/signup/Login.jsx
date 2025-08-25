import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../auth/AuthContext.jsx"; // Adjust the import path as necessary

export default function Login({ onClose, onSwitch }) {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Message = ({ text, type }) => {
    const baseClasses = "p-4 rounded-md text-center text-sm font-medium mb-4";
    const typeClasses = {
      error: "bg-red-100 text-red-700",
      success: "bg-green-100 text-green-700",
    };
    return <div className={`${baseClasses} ${typeClasses[type]}`}>{text}</div>;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };

    if (!formData.email || !formData.password) {
      setMessage("Please fill out all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("https://heart-failure-prediction-app.onrender.com/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({ text: data.message || "Login successful!", type: "success" });
        const userData = { name: data.data.firstname };
        localStorage.setItem("authToken", data.data.access_token);
        window.location.reload();
        setUser(userData);
        onClose();
      } else {
        setMessage({ text: data || "Login failed", type: "error" });
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };
  return (

    <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative">
      {/* Close Button */}
      <button
        className="absolute top-3 right-4 text-gray-500 text-2xl hover:text-red-500"
        onClick={onClose}
      >
        &times;
      </button>

      {/* Header */}
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-4">Welcome Back</h2>
      <p className="text-center text-gray-500 mb-8">Sign in to continue.</p>

      {message && <Message text={message.text} type={message.type} />}


      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="hello123@gmail.com"
          className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="hello123"
          className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Already have account */}
      <div className="text-center text-sm text-gray-600 mt-4">
        Don't have a account?{' '}
        <button onClick={onSwitch} className="text-blue-600 underline cursor-pointer">Register here</button>
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

  );
}

