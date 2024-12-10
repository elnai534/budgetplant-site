import React, { useState } from "react";

const Settings = ({ onClose }) => {
  // State for toggles
  const [isVolumeOn, setIsVolumeOn] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 w-80 border-4 border-gray-400 rounded-lg relative text-center">
        {/* Exit Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-lg font-bold hover:text-gray-400"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-2xl text-white mb-6 font-vt323">Settings</h2>

        {/* Volume Toggle */}
        <div className="flex justify-between items-center my-4">
          <span className="text-white text-lg font-vt323">Volume:</span>
          <button onClick={() => setIsVolumeOn(!isVolumeOn)}>
            <img
              src={
                isVolumeOn
                  ? "/assets/toggle-on.png"
                  : "/assets/toggle-off.png"
              }
              alt="Volume Toggle"
              className="w-12 h-6"
            />
          </button>
        </div>

        {/* Light Mode Toggle */}
        <div className="flex justify-between items-center my-4">
          <span className="text-white text-lg font-vt323">Light Mode:</span>
          <button onClick={() => setIsLightMode(!isLightMode)}>
            <img
              src={
                isLightMode
                  ? "/assets/toggle-on.png"
                  : "/assets/toggle-off.png"
              }
              alt="Light Mode Toggle"
              className="w-12 h-6"
            />
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex justify-between items-center my-4">
          <span className="text-white text-lg font-vt323">Dark Mode:</span>
          <button onClick={() => setIsDarkMode(!isDarkMode)}>
            <img
              src={
                isDarkMode
                  ? "/assets/toggle-on.png"
                  : "/assets/toggle-off.png"
              }
              alt="Dark Mode Toggle"
              className="w-12 h-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
