"use client";

import React, { useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "./_utils/firebase";
import Taskbar from "./components/taskbar";
import RecordsList from "./components/records-list";
import BudgetSummary from "./components/budget-summary";
import AddRecordPopup from "./components/edit-records";

const App = () => {
  const [user, setUser] = useState(null);
  const [showAddRecordPopup, setShowAddRecordPopup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Authenticated User:", user.uid); // Log the user's UID
        setUser(user);
      } else {
        console.warn("No user authenticated.");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="h-screen bg-[#4f455e]">
      <Taskbar />
      {user ? (
        <div className="flex flex-wrap justify-center gap-8 p-12 mt-20">
          {/* Left Section: Add Button and Records List */}
          <div className="flex flex-col w-full lg:w-[45%] h-[700px] bg-[#f5eed5] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Manage Records</h2>
            <button
              onClick={() => setShowAddRecordPopup(true)}
              className="w-full text-3xl px-4 py-2 mb-4 bg-[#fcb761] font-extrabold rounded-xl hover:bg-[#dead71] hover:text-gray-700 transition"
            >
              Add New Record
            </button>
            <div className="bg-white p-4 rounded-md shadow overflow-y-auto max-h-[900px]">
              <RecordsList user={user} />
            </div>
          </div>

          {/* Right Section: Budget Summary */}
          <div className="flex flex-col w-full lg:w-[45%] bg-[#f5eed5] p-6 rounded-lg shadow-lg">
            <BudgetSummary user={user} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-lg">Please log in to view your budget records.</p>
        </div>
      )}
      {showAddRecordPopup && (
        <AddRecordPopup
          user={user}
          onClose={() => setShowAddRecordPopup(false)}
        />
      )}
    </div>
  );
};

export default App;
