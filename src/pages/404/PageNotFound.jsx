import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaHeartbeat } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="relative flex flex-col items-center justify-center w-[600px] h-[500px] p-8 bg-white bg-opacity-5 rounded-2xl shadow-2xl backdrop-filter backdrop-blur-lg">
        <FaHeartbeat className="mb-6 text-red-500 animate-pulse" size={60} />
        <h1 className="text-8xl font-extrabold text-white">404</h1>
        <h2 className="mt-4 text-3xl font-semibold text-gray-200">
          Oops! Page Not Found
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 mt-8 text-base font-medium text-white bg-green-600 rounded-full hover:bg-green-700"
        >
          <FaHome className="mr-2" />
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;

