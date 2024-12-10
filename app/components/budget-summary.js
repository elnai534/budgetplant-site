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
    <div className="bg-[#f5eed5] p-6 rounded-lg shadow-lg">
      <h2 className="text-5xl font-bold mb-4 text-gray-800 text-center">Budget Summary</h2>
      <div className="bg-white p-4 rounded-md shadow">
        <p className="text-3xl font-semibold text-gray-800">
          Total Received:
          <span className="text-green-500 font-bold ml-2">
            ${totalReceived.toFixed(2)}
          </span>
        </p>
        <p className="text-3xl font-semibold text-gray-800">
          Total Spent:
          <span className="text-red-500 font-bold ml-2">
            ${Math.abs(totalSpent).toFixed(2)}
          </span>
        </p>
        <hr className="my-4 border-gray-300" />
        <p className="text-3xl font-semibold text-gray-800">
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
