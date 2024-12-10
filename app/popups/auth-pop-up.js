import React, { useEffect, useState } from "react";
import { auth, githubProvider, signInWithPopup, onAuthStateChanged } from "../_utils/firebase";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold">Login Required</h2>
        <p className="mb-4">Please log in to continue using the site.</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={handleLogin}
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
};

export default AuthPopup;
