import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTransaction } from "../../Context/Transactions/TransactionContext";

const TransactionsPage = () => {
  const { transactions } = useTransaction();
  const [formData, setFormData] = useState({
    type: "Income",
    amount: "",
    date: "",
    description: "",
  });
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Handle individual checkbox selection
  const handleSelectTransaction = (transactionId) => {
    setSelectedTransactions((prev) => {
      if (prev.includes(transactionId)) {
        return prev.filter((id) => id !== transactionId);
      }
      return [...prev, transactionId];
    });
  };

  // Handle select all/none
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedTransactions([]);
    } else {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.date) return;

    await addTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toISOString(),
    });

    setFormData({
      type: "Income",
      amount: "",
      date: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-20 w-full md:w-full lg:w-[75%] mx-auto">
      {/* Add Transaction Form */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FontAwesomeIcon icon={faPlus} className="mr-2 text-blue-500" />
          Add Transaction
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Transaction Type */}
          <div className="space-y-2 col-span-2">
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
          <div className="space-y-2">
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add note..."
              className="w-full bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Add Transaction
          </button>
        </form>
      </div>

      {/* Transactions List */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Transactions</h2>
          {selectedTransactions.length > 0 && (
            <button
              onClick={() => {
                deleteTransaction(selectedTransactions);
                setSelectedTransactions([]);
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
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
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-3">
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
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className="border-b border-gray-700 hover:bg-gray-750"
                  >
                    <td className="py-4">
                      <input
                        type="checkbox"
                        checked={selectedTransactions.includes(transaction._id)}
                        onChange={() =>
                          handleSelectTransaction(transaction._id)
                        }
                        className="form-checkbox h-4 w-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-4">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-4">{transaction.description}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          transaction.type === "Income"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-red-500/20 text-red-500"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td
                      className={`py-4 ${
                        transaction.type === "Income"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => deleteTransaction(transaction._id)}
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
    </div>
  );
};

export default TransactionsPage;
