"use client";

import React from "react";

const BudgetSummary = ({ data = [] }) => {
  const totalReceived = data
    .filter((item) => item.amount > 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const totalSpent = data
    .filter((item) => item.amount < 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const netBalance = totalReceived + totalSpent;

  return (
    <div className="fixed top-16 right-0 w-1/4 h-[calc(100%-4rem)] overflow-y-auto shadow-lg p-4">
      <h2 className="text-lg font-bold mb-4">Budget Summary</h2>
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <p className="text-md font-semibold text-gray-800">
          Total Received:
          <span className="text-green-500 font-bold ml-2">
            ${totalReceived.toFixed(2)}
          </span>
        </p>
        <p className="text-md font-semibold text-gray-800">
          Total Spent:
          <span className="text-red-500 font-bold ml-2">
            ${Math.abs(totalSpent).toFixed(2)}
          </span>
        </p>
        <hr className="my-4 border-gray-300" />
        <p className="text-md font-semibold text-gray-800">
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
