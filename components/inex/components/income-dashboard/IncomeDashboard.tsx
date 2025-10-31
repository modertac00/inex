import React from "react";
import { IncomeDashboardUI } from "./IncomeDashboardUI";
import { Transaction } from "../../type";

type Props = {};

const IncomeDashboard: React.FC<Props> = ({}) => {

      const totalIncome = 5000.0;
      const totalExpense = 2400.0;
      const totalBalance = 12000.0;

      const transactions: Transaction[] = [
    {
      id: '1',
      time: '11:58:37',
      description: 'General Expense',
      amount: 1000.0,
      type: 'expense',
    },
    {
      id: '2',
      time: '11:56:37',
      description: 'General Income',
      amount: 10000.0,
      type: 'income',
    },
  ];
  return (
   <IncomeDashboardUI transactions={transactions} totalIncome={totalIncome} totalExpense={totalExpense} totalBalance={totalBalance} />
  );
};

export default IncomeDashboard;

