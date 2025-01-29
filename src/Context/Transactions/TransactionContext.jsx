import axios from "axios";
import React, { useContext, useState } from "react";

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
          setTransactions(res.data?.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        getUserTransactionData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);
