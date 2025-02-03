import React from "react";
import { useTransaction } from "../../Context/Transactions/TransactionContext";

const DeleteAllModal = ({
  selectedTransactions,
  setShowDeleteAllModal,
  setSelectedTransactions,
}) => {
  const { deleteMultipleTransactions } = useTransaction();
  const handleDelete = () => {
    deleteMultipleTransactions(selectedTransactions);
    setSelectedTransactions([]);
    setShowDeleteAllModal(false);
  };

  const handleClose = () => {
    setShowDeleteAllModal(false);
  };
  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md bg-gray-800 rounded-lg shadow-sm">
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-sm w-8 h-8 flex justify-center items-center"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 md:p-5 text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-300">
            Are you sure you want to delete all the transactions?
          </h3>
          <button
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5"
            onClick={handleDelete}
          >
            Yes, I'm sure
          </button>
          <button
            className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-300 focus:outline-none bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-600 hover:text-white focus:ring-4 focus:ring-gray-600"
            onClick={handleClose}
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAllModal;
