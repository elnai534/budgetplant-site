"use client";

import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, onAuthStateChanged, db } from "./_utils/firebase";
import Taskbar from "./components/taskbar";
import RecordsList from "./components/records-list";
import BudgetSummary from "./components/budget-summary";
import AddRecordPopup from "./components/edit-records";
import InitializationPopup from "./popups/initialization-pop-up";

const App = () => {
  const [user, setUser] = useState(null);
  const [showAddRecordPopup, setShowAddRecordPopup] = useState(false);
  const [showInitializationPopup, setShowInitializationPopup] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Authenticated User:", user.uid);
        setUser(user);
  
        // Automatically check or create the user document in Firestore
        await handleUserSignIn(user);
  
        // Check if the user is initialized
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);
  
        if (docSnap.exists() && docSnap.data().initialized) {
          setUserData(docSnap.data());
          setShowInitializationPopup(false);
        } else {
          setShowInitializationPopup(true);
        }
      } else {
        console.warn("No user authenticated.");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  
  const handleUserSignIn = async (user) => {
    const userDocRef = doc(db, "users", user.uid);
  
    try {
      // Check if the user document exists
      const docSnap = await getDoc(userDocRef);
  
      if (!docSnap.exists()) {
        // Create a new user document with default values
        await setDoc(userDocRef, {
          name: "",
          budget: 0,
          initialized: false, // Mark as not initialized
        });
        console.log("New user document created for:", user.uid);
      } else {
        console.log("User document already exists for:", user.uid);
      }
    } catch (error) {
      console.error("Error checking or creating user document:", error);
    }
  };
  

  const handleInitializationSubmit = async (data) => {
    const userDoc = doc(db, "users", user.uid);
  
    try {
      await setDoc(userDoc, {
        name: data.name,
        budget: data.budget,
        initialized: true,
      });
      setUserData(data);
      setShowInitializationPopup(false);
      console.log("User initialized with data:", data);
    } catch (error) {
      console.error("Error saving initialization data:", error);
    }
  };

  return (
<<<<<<< HEAD
    <div className="h-screen bg-[#4f455e]">
      <Taskbar />
      {user ? (
        <div className="flex flex-wrap justify-center gap-8 p-12 mt-20">
          {/* Left Section: Add Button and Records List */}
          <div className="flex flex-col w-full lg:w-[45%] h-[700px] bg-[#f5eed5] p-6 rounded-lg shadow-lg">
            <h2 className="text-5xl font-bold mb-4 text-gray-800 text-center">Manage Records</h2>
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
=======
    <div className="h-screen">
      {showInitializationPopup && (
        <InitializationPopup onSubmit={handleInitializationSubmit} />
>>>>>>> 2522cf35b4fe9e21154c5387e4013e9ea69b5e44
      )}
      {!showInitializationPopup && (
        <>
          <Taskbar />
          {user ? (
            <div className="flex">
              <div className="w-1/4 p-4 fixed top-16 left-0 z-10">
                <button
                  onClick={() => setShowAddRecordPopup(true)}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Add New Record
                </button>
              </div>
              <div className="w-1/4 p-4 fixed top-24 left-0 overflow-y-auto">
                <RecordsList user={user} />
              </div>
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
        </>
      )}
    </div>
  );
};

export default App;
