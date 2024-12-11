// components/InitializationPopup.js
"use client";

import React, { useState } from "react";

const InitializationPopup = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && budget.trim()) {
      onSubmit({ name, budget });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#f5eed5] p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl text-black font-bold mb-4">Welcome!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="budget" className="block text-lg font-medium text-gray-700 mb-1">
              Monthly Budget
            </label>
            <input
              id="budget"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full p-2 border text-black rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#fcb761] text-white py-2 rounded-md hover:bg-[#dead71] hover:text-gray-700 font-semibold transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default InitializationPopup;
