"use client";

import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../_utils/firebase"; // Adjust this import based on your Firebase config

const BudgetSummary = ({ user }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const db = getFirestore(app);
        const recordsRef = collection(db, "budgetRecords"); // Adjust "budgetRecords" to your collection name
        const q = query(recordsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching budget data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const totalReceived = data
    .filter((item) => item.amount > 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const totalSpent = data
    .filter((item) => item.amount < 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const netBalance = totalReceived + totalSpent;

  if (loading) {
    return (
      <div className="bg-[#f5eed5] p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Budget Summary</h2>
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f5eed5] p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Budget Summary</h2>
      <div className="bg-white p-4 rounded-md shadow">
        <p className="text-2xl font-semibold text-gray-800">
          Total Received:
          <span className="text-green-500 font-bold ml-2">
            ${totalReceived.toFixed(2)}
          </span>
        </p>
        <p className="text-2xl font-semibold text-gray-800">
          Total Spent:
          <span className="text-red-500 font-bold ml-2">
            ${Math.abs(totalSpent).toFixed(2)}
          </span>
        </p>
        <hr className="my-4 border-gray-300" />
        <p className="text-2xl font-semibold text-gray-800">
          Net Balance:
          <span
            className={`font-bold ml-2 ${
              netBalance >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            ${netBalance.toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default BudgetSummary;
