import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  // page-load 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://stage.leyjao.pk/api/login",
        { email, password }
      );

      console.log("Response:", res.data);

      // store token
      sessionStorage.setItem(
        "token",
        res.data.data.refresh_token
      );

      console.log("Login success");

      navigate("/");

    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 md:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required={true}
            className="border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required={true}
            className="border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold rounded-lg p-3 mt-2 text-sm sm:text-base hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}