import React, { useState, useEffect } from "react";

const Popup2 = ({ onClose }) => {
  // Initialize state from localStorage or fallback to defaults
  const [name, setName] = useState(localStorage.getItem("name") || "John Doe");
  const [joined, setJoined] = useState(localStorage.getItem("joined") || "January 2024");
  const [targetAmount, setTargetAmount] = useState(localStorage.getItem("targetAmount") || 0);

  // Update localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("joined", joined);
    localStorage.setItem("targetAmount", targetAmount);
  }, [name, joined, targetAmount]);

  const handleNameChange = (e) => {
    setName(e.target.value); // Update name
  };

  const handleTargetAmountChange = (e) => {
    setTargetAmount(e.target.value); // Update target amount
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex flex-col items-center">
          <img
            src="https://cdn4.iconfinder.com/data/icons/rounded-black-basic-ui/139/Profile01-RoundedBlack-512.png"
            alt="Profile Icon"
            className="w-20 h-20 mb-4 rounded-full border-4 border-gray-700"
          />
          <h2 className="text-xl font-bold mb-4">Profile</h2>
        </div>
        <div className="text-center">
          <div className="mb-4">
            <p className="font-semibold mb-2">
              <span className="text-gray-400">Name: </span>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="bg-gray-600 text-white rounded px-2 py-1"
              />
            </p>
            <p className="font-semibold">
              <span className="text-gray-400">Joined: </span>
              {joined}
            </p>
          </div>
          
          <div className="mb-4">
            <p className="font-semibold mb-2">
              <span className="text-gray-400">Set Your Spending Target: </span>
              <input
                type="number"
                value={targetAmount}
                onChange={handleTargetAmountChange}
                className="bg-gray-600 text-white rounded px-2 py-1"
                placeholder="Enter amount"
              />
            </p>
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 bg-pink-400 text-gray-900 font-bold rounded hover:bg-pink-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup2;
