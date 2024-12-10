"use client";

import React, { useState, useEffect } from "react";
import Popup1 from "../popups/popup1";
import Popup2 from "../popups/popup2";
import Popup3 from "../popups/popup3";
import Popup4 from "../popups/popup4";
import Popup5 from "../popups/popup5";
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
        <div className="fixed top-0 left-0 w-full bg-gray-800 shadow-lg">
          <div className="flex justify-center items-center py-3">
            <button
              className="mx-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
              onClick={() => openPopup(1)}
            >
              History
            </button>
            <button
              className="mx-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
              onClick={() => openPopup(2)}
            >
              Profile
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
              Button 4
            </button>
            <button
              className="mx-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
              onClick={() => openPopup(5)}
            >
              Button 5
            </button>
          </div>
        </div>
      )}

      {activePopup === 1 && <Popup1 onClose={closePopup} />}
      {activePopup === 2 && <Popup2 onClose={closePopup} />}
      {activePopup === 3 && <Popup3 onClose={closePopup} />}
      {activePopup === 4 && <Popup4 onClose={closePopup} />}
      {activePopup === 5 && <Popup5 onClose={closePopup} />}
    </>
  );
};

export default Taskbar;
