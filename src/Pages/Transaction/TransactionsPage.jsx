import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTransaction } from "../../Context/Transactions/TransactionContext";
import * as Yup from "yup";
import DeleteModal from "../../Components/Modal/DeleteModal";
import "react-toastify/dist/ReactToastify.css";
import DeleteAllModal from "../../Components/Modal/DeleteAllModal";
import { getTotalExpense, getTotalIncome } from "../../Utils/totalGetter";

const TransactionsPage = () => {
  const { transactions, addTransaction, getUserTransactionData } =
    useTransaction();

  const [errors, setErrors] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  const [formData, setFormData] = useState({
    type: "Income",
    amount: "",
    date: "",
    description: "",
  });
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState();
  const [selectAll, setSelectAll] = useState(false);

  const toggleDescription = (transactionId) => {
    setExpandedDescription((prev) =>
      prev.includes(transactionId)
        ? prev.filter((id) => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  // Handle individual checkbox selection
  const handleSelectTransaction = (transactionId) => {
    setSelectedTransactions((prev) => {
      if (prev.includes(transactionId)) {
        // if the id is already in the array remove it
        return prev.filter((id) => id !== transactionId);
      }
      return [...prev, transactionId];
    });
  };

  // Handle select all/none
  const handleSelectAll = () => {
    if (selectAll) {
      // empty the selected transactions when everything is selected
      setSelectedTransactions([]);
    } else {
      // if the select all was empty then add the ids
      setSelectedTransactions(transactions.map((t) => t._id));
    }
    setSelectAll(!selectAll);
  };

  // Update select all state when transactions change
  useEffect(() => {
    setSelectAll(
      selectedTransactions.length === transactions.length &&
        transactions.length > 0
    );
  }, [selectedTransactions, transactions]);

  const transactionValidationSchema = Yup.object({
    type: Yup.string().required("Type is required."),
    amount: Yup.number()
      .typeError("Amount must be a number.")
      .positive("Amount must be greater than zero.")
      .required("Amount is required."),
    date: Yup.date()
      .transform((originalValue) => {
        if (!originalValue) return undefined;
        return new Date(originalValue);
      })
      .required("Date is required.")
      .max(new Date(), "Date cannot be in the future."),
    description: Yup.string().required("Description is required."),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await transactionValidationSchema.validate(formData, {
        abortEarly: false,
      });

      await addTransaction(formData);
      setErrors({});
      setFormData({
        type: "Income",
        amount: "",
        date: "",
        description: "",
      });
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => (newErrors[err.path] = err.message));

      setErrors(newErrors);
      return;
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      await getUserTransactionData();
    };

    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openDeleteModal = (id) => {
    setSelectedTransactionId(id);
    setShowDeleteModal(true);
  };

  const openDeleteAllModal = () => {
    setShowDeleteAllModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 w-full lg:w-[75%] mx-auto">
      {showDeleteModal ? (
        <DeleteModal
          transactionId={selectedTransactionId}
          setShowDeleteModal={setShowDeleteModal}
        />
      ) : showDeleteAllModal ? (
        <DeleteAllModal
          selectedTransactions={selectedTransactions}
          setShowDeleteAllModal={setShowDeleteAllModal}
          setSelectedTransactions={setSelectedTransactions}
        />
      ) : (
        <>
          <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-2 text-blue-500" />
              Add Transaction
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Transaction Type */}
              <div className="col-span-2">
                <label className="block text-sm font-medium">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>

              {/* Amount */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                />
                {errors.amount && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.amount}
                  </span>
                )}
              </div>

              {/* Date */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                />
                {errors.date && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.date}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add note..."
                  className="w-full bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
                {errors.description && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                Add Transaction
              </button>
            </form>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold">
                Recent Transactions
              </h2>
              {selectedTransactions.length > 0 && (
                <button
                  onClick={() => {
                    openDeleteAllModal();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition text-md"
                >
                  Delete Selected ({selectedTransactions.length})
                </button>
              )}
            </div>

            {transactions.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                No transactions found
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full ">
                  <thead>
                    <tr className="text-left border-b border-gray-700 text-sm md:text-base">
                      <th className="pb-3 px-3">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            className="form-checkbox h-4 w-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                          />
                          <span>Select All</span>
                        </label>
                      </th>
                      <th className="pb-3 px-3 whitespace-nowrap">Date</th>
                      <th className="pb-3 px-3 whitespace-nowrap">
                        Description
                      </th>
                      <th className="pb-3 px-3 whitespace-nowrap">Type</th>
                      <th className="pb-3 px-3 whitespace-nowrap">Amount</th>
                      <th className="pb-3 px-3 whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction._id}
                        className="border-b border-gray-700 hover:bg-gray-750 text-sm md:text-base"
                      >
                        <td className="py-3 px-3">
                          <input
                            type="checkbox"
                            checked={selectedTransactions.includes(
                              transaction._id
                            )}
                            onChange={() =>
                              handleSelectTransaction(transaction._id)
                            }
                            className="form-checkbox h-4 w-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-3 px-3">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-3 ">
                          {transaction.description}
                        </td>
                        <td
                          className={`py-3 px-3 ${
                            transaction.type === "Income"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {transaction.type}
                        </td>
                        <td className="py-3 px-3">
                          ${parseFloat(transaction.amount).toFixed(2)}
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => openDeleteModal(transaction._id)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex justify-around">
            <div className="text-green-500">
              Total Earned : ${getTotalIncome(transactions)}
            </div>
            <div className="text-red-500">
              Total Spent: ${getTotalExpense(transactions)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionsPage;
