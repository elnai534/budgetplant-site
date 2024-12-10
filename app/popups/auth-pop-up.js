import React from "react";
import { auth, githubProvider, signInWithPopup } from "../_utils/firebase";

const AuthPopup = ({ onLogin }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      onLogin(result.user); 
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#4f455e] flex justify-center items-center">
      <div className="bg-[#f5eed5] p-10 rounded-lg shadow-2xl w-[600px] h-[400px] flex flex-col justify-between items-center">
        <h2 className="text-6xl font-bold text-gray-900">Login Required</h2>
        <p className="text-3xl text-gray-700 mb-4">
          Please log in to continue using the site.
        </p>
        <button
          className="px-8 py-3 bg-[#FCB761] text-white text-3xl font-semibold rounded-lg hover:bg-[#dead71] hover:text-gray-700 transition"
          onClick={handleLogin}
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
};

export default AuthPopup;
