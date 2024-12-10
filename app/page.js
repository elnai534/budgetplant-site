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
    <div className="h-screen">
      <Taskbar />
      {user ? (
        <div className="flex">
          {/* Left Section: Add Button */}
          <div className="w-1/4 p-4 fixed top-16 left-0 z-10">
            <button
              onClick={() => setShowAddRecordPopup(true)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Add New Record
            </button>
          </div>

          {/* Left Section: Records List */}
          <div className="w-1/4 p-4 fixed top-24 left-0 overflow-y-auto">
            <RecordsList user={user} />
          </div>

          {/* Right Section: Budget Summary */}
          <div className="ml-[25%] w-3/4">
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
