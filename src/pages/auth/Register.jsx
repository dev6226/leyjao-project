import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Register() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 via-blue-50 to-pink-50 p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 md:p-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Sign Up
        </h2>

        <form className="flex flex-col gap-4">
          <motion.input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.button
            type="submit"
            className="bg-green-500 text-white font-semibold rounded-lg p-3 mt-2 hover:bg-green-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-500 cursor-pointer font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}