import React, { useState } from "react";

const Settings = ({ onClose }) => {
  // State for toggles
  const [isVolumeOn, setIsVolumeOn] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-[#f5eed5] p-6 w-80 border-4 border-[#4f455e] rounded-lg relative text-center">
        {/* Exit Button */}
        <button
          className="absolute top-2 right-2 px-4 py-2 text-black font-bold rounded-full hover:bg-gray-700 hover:text-white"
          onClick={onClose}
        >
          X
        </button>

        {/* Title */}
        <h2 className="text-2xl text-black mb-6 font-bold font-vt323">Settings</h2>

        {/* Volume Toggle */}
        <div className="flex justify-between items-center my-4">
          <span className="text-black text-lg font-bold font-vt323">Volume:</span>
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
          <span className="text-black text-lg font-bold font-vt323">Light Mode:</span>
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
          <span className="text-black text-lg font-bold font-vt323">Dark Mode:</span>
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