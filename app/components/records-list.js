"use client";

import React, { useEffect, useState } from "react";
import { db, collection, query, where, onSnapshot } from "../_utils/firebase";

const RecordsList = ({ user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "budgetRecords"),
        where("userId", "==", user.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const records = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(records);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const formatDate = (isoDate) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(isoDate).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white p-4 rounded-md max-h-[455px]">
      <ul className="space-y-4">
        {data.map((item) => (
          <li
            key={item.id}
            className="border border-gray-300 rounded-lg p-4 bg-gray-100 shadow hover:bg-gray-300 transition"
          >
            <p className="text-xl text-gray-700 italic">{formatDate(item.date)}</p>
            <p className="text-2xl font-semibold text-gray-800">{item.category}</p>
            <p className="text-xl text-gray-600">{item.description}</p>
            <p
              className={`text-2xl font-bold ${
                item.amount > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.amount > 0
                ? `+$${item.amount.toFixed(2)}`
                : `-$${Math.abs(item.amount.toFixed(2))}`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordsList;
