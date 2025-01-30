import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

const TransactionContext = React.createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const endpoint = import.meta.env.VITE_ENDPOINT;

  const getUserTransactionData = () => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));

    axios
      .get(`${endpoint}/transactions`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then((res) => {
        const newTransactions = res.data?.data;
        if (JSON.stringify(newTransactions) !== JSON.stringify(transactions)) {
          setTransactions(newTransactions);
        }
      })
      .catch((err) => console.log(err));
  };

  const addTransaction = async (transaction) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));

    axios
      .post(`${endpoint}/transactions/add`, transaction, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          console.log("Toast called");
          toast.success("Transaction added successfully.", {
            autoClose: 2500,
            pauseOnHover: false,
          });
          console.log("Toast executed");
          getUserTransactionData();
          console.log("Data fetched");
        }
      })
      .catch((err) => {
        console.log(err);
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
        console.log(res);
        if (res.status == 200) {
          console.log("i am here");
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
      .catch((err) => {
        console.log(err);
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
        data: { transactions: transactionIds }, // Send data in the `data` property
      })
      .then((res) => {
        console.log(res);
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
      .catch((err) => {
        console.log(err);
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
