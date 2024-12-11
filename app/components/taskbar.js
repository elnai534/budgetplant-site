"use client";

import React, { useState, useEffect } from "react";
import Popup1 from "../popups/popup1";
import Popup2 from "../popups/popup2";
import Popup3 from "../popups/popup3";
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
        <div className="fixed top-0 left-0 w-full bg-[#42394f] shadow-lg">
          <div className="flex justify-between items-center py-5 px-12">
            {/* Left Side: Title */}
            <h1 className="text-4xl font-bold text-[#fcb761]">BUDGET PLANT</h1>

            {/* Right Side: Buttons */}
            <div className="flex space-x-8">
              <button
                className="w-40 h-10 text-3xl text-white bg-[#fcb761] font-extrabold rounded-xl hover:bg-[#dead71] hover:text-gray-700 transition"
                onClick={() => openPopup(1)}
              >
                History
              </button>
              <button
                className="w-40 h-10 text-3xl text-white bg-[#fcb761] font-extrabold rounded-xl hover:bg-[#dead71] hover:text-gray-700 transition"
                onClick={() => openPopup(2)}
              >
                Profile
              </button>
              
              <button
                className="w-40 h-10 text-3xl text-white bg-[#fcb761] font-extrabold rounded-xl hover:bg-[#dead71] hover:text-gray-700 transition"
                onClick={() => openPopup(3)}
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {activePopup === 1 && <Popup1 onClose={closePopup} />}
      {activePopup === 2 && <Popup2 onClose={closePopup} />}
      {activePopup === 3 && <Settings onClose={closePopup} />}

    </>
  );
};

export default Taskbar;
