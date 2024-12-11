"use client";

import React, { useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "./_utils/firebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import Taskbar from "./components/taskbar";
import RecordsList from "./components/records-list";
import BudgetSummary from "./components/budget-summary";
import AddRecordPopup from "./components/edit-records";
import InitializationPopup from "./popups/initialization-pop-up";

const App = () => {
  const [user, setUser] = useState(null);
  const [showAddRecordPopup, setShowAddRecordPopup] = useState(false);
  const [showInitializationPopup, setShowInitializationPopup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Authenticated User:", user.uid);
        setUser(user);

        // Check if the user has a budget set
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists() || !userDoc.data().budget) {
          // Show the initialization popup if no budget is set
          setShowInitializationPopup(true);
        }
      } else {
        console.warn("No user authenticated.");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInitializationSubmit = async ({ name, budget }) => {
    const db = getFirestore();
    const userDocRef = doc(db, "users", user.uid);

    try {
      await setDoc(userDocRef, { name, budget: parseFloat(budget) }, { merge: true });
      setShowInitializationPopup(false);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <div className="h-screen bg-[#4f455e]">
      <Taskbar />
      {user ? (
        <div className="flex flex-wrap justify-center gap-8 p-12 mt-20">
          {showInitializationPopup ? (
            <InitializationPopup onSubmit={handleInitializationSubmit} />
          ) : (
            <>
              {/* Left Section: Add Button and Records List */}
              <div className="flex flex-col w-full lg:w-[40%] h-[500px] bg-[#f5eed5] p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Manage Records</h2>
                <button
                  onClick={() => setShowAddRecordPopup(true)}
                  className="w-full text-3xl px-4 py-2 mb-4 bg-[#fcb761] font-extrabold rounded-xl hover:bg-[#dead71] hover:text-gray-700 transition"
                >
                  Add New Record
                </button>
                <div className="bg-white p-10 rounded-md shadow overflow-y-auto w-[520px] max-h-[600px]">
                  <RecordsList user={user} />
                </div>
              </div>

              {/* Right Section: Budget Summary */}
              <div className="flex flex-col w-full lg:w-[40%] bg-[#f5eed5] p-6 rounded-lg shadow-lg">
                <BudgetSummary user={user} />
              </div>
            </>
          )}
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
