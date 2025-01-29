import React, { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../../Others/capitalize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faMoneyBillTrendUp,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import { useTransaction } from "../../Context/Transactions/TransactionContext";

const Dashboard = () => {
  const { getUserTransactionData, transactions } = useTransaction();

  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [userName, setUserName] = useState("" || "User");

  useEffect(() => getUserTransactionData(), []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUserName(storedUser.userName);
    }
  });

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const income = transactions
        .filter((transaction) => transaction.type == "Income")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      const expense = transactions
        .filter((transaction) => transaction.type == "Expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      const balance = income - expense;

      setBalance(balance);
      setExpense(expense);
      setIncome(income);
    }
  }, [transactions]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-20 w-full  md:w-full lg:w-[75%]">
      {" "}
      {/* Top Section: Greeting */}
      <div className="text-3xl font-bold mb-8">
        Hello, {capitalizeFirstLetter(userName)}!
      </div>
      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Balance */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
          <FontAwesomeIcon
            icon={faWallet}
            className="text-4xl text-blue-500 mr-4"
          />
          <div>
            <h2 className="text-2xl font-semibold">Balance</h2>
            <p className="text-gray-400 text-xl">${balance}</p>
          </div>
        </div>

        {/* Income */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
          <FontAwesomeIcon
            icon={faMoneyBillTrendUp}
            className="text-4xl text-green-500 mr-4"
          />
          <div>
            <h2 className="text-2xl font-semibold">Income</h2>
            <p className="text-gray-400 text-xl">${income}</p>
          </div>
        </div>

        {/* Expense */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
          <FontAwesomeIcon
            icon={faMoneyBillTransfer}
            className="text-4xl text-red-500 mr-4"
          />
          <div>
            <h2 className="text-2xl font-semibold">Expense</h2>
            <p className="text-gray-400 text-xl">${expense}</p>
          </div>
        </div>
      </div>
      {/* Second Row: Placeholder for Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Chart 1</h2>
          <div className="h-40 bg-gray-700 rounded-lg"></div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Chart 2</h2>
          <div className="h-40 bg-gray-700 rounded-lg"></div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Chart 3</h2>
          <div className="h-40 bg-gray-700 rounded-lg"></div>
        </div>
      </div>
      {/* Third Row: Full-width Chart Placeholder */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Overview Chart</h2>
        <div className="h-64 bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );
};

export default Dashboard;
