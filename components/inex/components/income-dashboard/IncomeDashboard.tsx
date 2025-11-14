import React from "react";
import { IncomeDashboardUI } from "./IncomeDashboardUI";
import { Transaction } from "../../type";
import { InExItem } from "@/types/inex";
import { useAppSelector } from "@/store/hooks";
import { 
  selectSelectedSession,
  selectSelectedSessionItems,
  selectTotalIncome,
  selectTotalExpense,
  selectBalance,
  selectHasSessions,
  selectSessions,
  selectSelectedSessionId
} from "@/store/selectors/inexSelectors";

type Props = {};

const IncomeDashboard: React.FC<Props> = ({}) => {
  const selectedSession = useAppSelector(selectSelectedSession);
  const selectedSessionId = useAppSelector(selectSelectedSessionId)
  const allSessions = useAppSelector(selectSessions);
  const sessionItems = useAppSelector(selectSelectedSessionItems);
  const totalIncome = useAppSelector(selectTotalIncome);
  const totalExpense = useAppSelector(selectTotalExpense);
  const balance = useAppSelector(selectBalance);
  const hasSessions = useAppSelector(selectHasSessions);

  
  // Convert InExItems to Transaction format for the UI
  const transactions: Transaction[] = sessionItems.map((item: InExItem): Transaction => ({
    id: item.id,
    time: item.time,
    description: item.description,
    title: item.title,
    amount: item.amount,
    type: item.type,
  }));
  
  // If no sessions exist, show sample data for development
  const sampleTransactions: Transaction[] =[];
  
  const displayTransactions = transactions.length > 0 ? transactions : sampleTransactions;
  const displayTotalIncome = totalIncome;
  const displayTotalExpense = totalExpense;
  const displayBalance =  balance;

  return (
   <IncomeDashboardUI
   sessions={allSessions}
   selectedSessionId={selectedSessionId}
     transactions={displayTransactions}
     totalIncome={displayTotalIncome}
     totalExpense={displayTotalExpense}
     totalBalance={displayBalance}
   />
  );
};

export default IncomeDashboard;

