"use client";

import React, { useState, useEffect } from "react";
import Popup1 from "../popups/popup1";
import Popup2 from "../popups/popup2";
import Popup3 from "../popups/popup3";
import Profile from "../popups/profile";
import Settings from "../popups/settings";
import AuthPopup from "../popups/auth-pop-up";
import { auth, onAuthStateChanged } from "../_utils/firebase";

const Taskbar = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const openPopup = (popupNumber) => {
    setActivePopup(popupNumber);
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  if (isCheckingAuth) {
    return null;
  }

  return (
    <>
      {!isAuthenticated && (
        <AuthPopup
          onLogin={handleLogin}
          onClose={() => setIsAuthenticated(false)}
        />
      )}

      {isAuthenticated && (
<<<<<<< HEAD
        <div className="fixed top-0 left-0 w-full bg-[#42394f] shadow-lg">
          <div className="flex justify-between items-center py-6 px-12">
            {/* Left Side: Title */}
            <h1 className="text-8xl font-bold text-[#fcb761]">BUDGET PLANT</h1>

            {/* Right Side: Buttons */}
            <div className="flex space-x-8">
              <button
                className="w-60 h-16 text-3xl text-white bg-[#fcb761] font-extrabold rounded-xl hover:bg-[#dead71] hover:text-gray-700 transition"
                onClick={() => openPopup(1)}
              >
                Button 1
              </button>
              <button
                className="w-60 h-16 text-3xl text-white bg-[#fcb761] font-extrabold rounded-xl hover:bg-[#dead71] hover:text-gray-700 transition"
                onClick={() => openPopup(2)}
              >
                Button 2
              </button>
            </div>
=======
        <div className="fixed top-0 left-0 w-full bg-gray-800 shadow-lg">
          <div className="flex justify-center items-center py-3">
            <button
              className="mx-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
              onClick={() => openPopup(1)}
            >
              Button 1
            </button>
            <button
              className="mx-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
              onClick={() => openPopup(2)}
            >
              Button 2
            </button>
            <button
              className="mx-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
              onClick={() => openPopup(3)}
            >
              Button 3
            </button>
            <button
              className="mx-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
              onClick={() => openPopup(4)}
            >
              Profile
            </button>
            <button
              className="mx-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
              onClick={() => openPopup(5)}
            >
              Settings
            </button>
>>>>>>> 2522cf35b4fe9e21154c5387e4013e9ea69b5e44
          </div>
        </div>
      )}

      {activePopup === 1 && <Popup1 onClose={closePopup} />}
      {activePopup === 2 && <Popup2 onClose={closePopup} />}
<<<<<<< HEAD
=======
      {activePopup === 3 && <Popup3 onClose={closePopup} />}
      {activePopup === 4 && <Profile onClose={closePopup} />}
      {activePopup === 5 && <Settings onClose={closePopup} />}
>>>>>>> 2522cf35b4fe9e21154c5387e4013e9ea69b5e44
    </>
  );
};

export default Taskbar;
