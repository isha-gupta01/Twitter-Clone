"use client"
import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white opacity-100 text-black p-6 rounded-lg">
        <p className="text-lg mb-4">Are you sure you want to delete this tweet?</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="mr-4 text-white px-4 py-2 bg-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
     </div>
  );
};

export default DeleteConfirmationModal;
