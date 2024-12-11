// popup1.js
import React, { useEffect, useState } from "react";
import RecordsListAll from "../components/records-list-all";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Popup1 = ({ onClose }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#f5eed5] border-4 border-[#4f455e] p-6 rounded-lg shadow-lg w-1/2 max-w-4xl relative">
        <h2 className="text-lg text-black font-bold">History</h2>
        
        {/* Render RecordsListAll with the user's UID */}
        <div className="overflow-y-auto h-96">
          <RecordsListAll userId={userId} />
        </div>

        {/* Close Button positioned at the top-right */}
        <button
          className="absolute top-2 right-2 px-4 py-2 text-black font-bold rounded-full hover:bg-gray-700 hover:text-white"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Popup1;
