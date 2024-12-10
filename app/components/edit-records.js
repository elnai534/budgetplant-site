"use client";

import React, { useState } from "react";
import { auth, db, collection, addDoc } from "../_utils/firebase";

const AddRecordPopup = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    category: "",
    description: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = auth.currentUser?.uid;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      const dateTime = `${formData.date}T${formData.time}`;
      const newRecord = {
        date: dateTime,
        category: formData.category,
        description: formData.description,
        amount: parseFloat(formData.amount),
        userId,
      };
      await addDoc(collection(db, "budgetRecords"), newRecord);
      onClose();
    } catch (error) {
      console.error("Error adding record:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#f5eed5] p-10 rounded-lg shadow-lg w-[700px] h-auto">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">Add New Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-2xl font-semibold text-gray-800 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border text-2xl border-gray-300 rounded-lg text-gray-700"
            />
          </div>
          <div className="mb-6">
            <label className="block text-2xl font-semibold text-gray-800 mb-2">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border text-2xl border-gray-300 rounded-lg text-gray-700"
            />
          </div>
          <div className="mb-6">
            <label className="block text-2xl font-semibold text-gray-800 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Groceries"
              required
              className="w-full px-4 py-3 border text-2xl border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="block text-2xl font-semibold text-gray-800 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g., Bought fruits and vegetables"
              required
              className="w-full px-4 py-3 border text-2xl border-gray-300 rounded-lg"
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-2xl font-semibold text-gray-800 mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="e.g., 50 (for income, -50 for expense)"
              required
              className="w-full px-4 py-3 border text-2xl border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 mr-4 bg-gray-500 text-white text-3xl rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#fcb761] text-white text-3xl rounded-lg hover:bg-[#dead71] hover:text-gray-700 transition"
            >
              Add Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecordPopup;
