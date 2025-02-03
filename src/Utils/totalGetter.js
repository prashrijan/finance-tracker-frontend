export const getTotalIncome = (transactions) => {
  return transactions
    .filter((transaction) => transaction.type == "Income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const getTotalExpense = (transactions) => {
  return transactions
    .filter((transaction) => transaction.type == "Expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};
