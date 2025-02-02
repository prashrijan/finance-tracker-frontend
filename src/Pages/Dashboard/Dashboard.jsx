import React, { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../../Others/capitalize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faMoneyBillTrendUp,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import { useTransaction } from "../../Context/Transactions/TransactionContext";
import {
  BarGraph,
  DoughnutChart,
  IncomeLineChart,
  ExpenseLineChart,
} from "../../index";

const Dashboard = () => {
  const { getUserTransactionData, transactions } = useTransaction();

  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [userName, setUserName] = useState("" || "User");

  const fetchTransactionData = async () => {
    await getUserTransactionData();
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

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
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 w-full overflow-x-hidden">
      {/* Top Section: Greeting */}
      <div className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
        Hello, {capitalizeFirstLetter(userName)}!
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        {/* Balance */}
        <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg flex items-center">
          <FontAwesomeIcon
            icon={faWallet}
            className="text-3xl md:text-4xl text-blue-500 mr-4"
          />
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">Balance</h2>
            <p className="text-gray-400 text-lg md:text-xl">${balance}</p>
          </div>
        </div>

        {/* Income */}
        <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg flex items-center">
          <FontAwesomeIcon
            icon={faMoneyBillTrendUp}
            className="text-3xl md:text-4xl text-green-500 mr-4"
          />
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">Income</h2>
            <p className="text-gray-400 text-lg md:text-xl">${income}</p>
          </div>
        </div>

        {/* Expense */}
        <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg flex items-center">
          <FontAwesomeIcon
            icon={faMoneyBillTransfer}
            className="text-3xl md:text-4xl text-red-500 mr-4"
          />
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">Expense</h2>
            <p className="text-gray-400 text-lg md:text-xl">${expense}</p>
          </div>
        </div>
      </div>

      {/* Second Row: Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        {/* Doughnut Chart */}
        <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Income vs Expense</h2>
          <div className="h-64 md:h-72">
            <DoughnutChart income={income} expense={expense} />
          </div>
        </div>

        {/* Income Line Chart */}
        <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Income Trend</h2>
          <div className="h-64 md:h-72">
            <IncomeLineChart income={income} />
          </div>
        </div>

        {/* Expense Line Chart */}
        <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Expense Trend</h2>
          <div className="h-64 md:h-72">
            <ExpenseLineChart expense={expense} />
          </div>
        </div>
      </div>

      {/* Third Row: Full-width Bar Graph */}
      <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
        <div className="h-80 md:h-96">
          <BarGraph income={income} expense={expense} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
