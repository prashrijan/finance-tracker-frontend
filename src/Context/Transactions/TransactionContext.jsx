import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

const TransactionContext = React.createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const endpoint = import.meta.env.VITE_ENDPOINT;

  const getUserTransactionData = async () => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));

    try {
      const res = await axios.get(`${endpoint}/transactions`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });

      const newTransactions = res.data?.data || [];
      if (JSON.stringify(newTransactions) !== JSON.stringify(transactions)) {
        setTransactions(newTransactions);
      }
    } catch (error) {
      toast.success("Error while fetching transactions.", {
        autoClose: 2500,
        pauseOnHover: false,
      });
    }
  };

  const addTransaction = async (transaction) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));

    axios
      .post(`${endpoint}/transactions/add`, transaction, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then(async (res) => {
        if (res.status == 201) {
          toast.success("Transaction added successfully.", {
            autoClose: 2500,
            pauseOnHover: false,
          });
          await getUserTransactionData();
        }
      })
      .catch((_) => {
        toast.error("Failed to add transaction. Please try again.", {
          autoClose: 2500,
          pauseOnHover: false,
        });
      });
  };

  const deleteTransaction = (transactionId) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));

    axios
      .delete(`${endpoint}/transactions/delete/${transactionId}`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success("Transaction deleted successfully.", {
            autoClose: 2500,
            pauseOnHover: false,
          });
        }
        setTransactions((prevTransactions) =>
          prevTransactions.filter(
            (transaction) => transaction._id !== transactionId
          )
        );
      })
      .catch((_) => {
        toast.error("Failed to delete transaction. Please try again.", {
          autoClose: 2500,
          pauseOnHover: false,
        });
      });
  };

  const deleteMultipleTransactions = (transactionIds) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));

    axios
      .delete(`${endpoint}/transactions/delete`, {
        headers: {
          Authorization: `${accessToken}`,
        },
        data: { transactions: transactionIds },
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success("Transactions deleted successfully.", {
            autoClose: 2500,
            pauseOnHover: false,
          });
        }
        setTransactions((prev) =>
          prev.filter(
            (transaction) => !transactionIds.includes(transaction._id)
          )
        );
      })
      .catch((_) => {
        toast.error("Failed to delete transactions. Please try again.", {
          autoClose: 2500,
          pauseOnHover: false,
        });
      });
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        getUserTransactionData,
        addTransaction,
        deleteTransaction,
        deleteMultipleTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);
