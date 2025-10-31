import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Transaction } from "../../type";
import HeaderUI from "./HeaderUI";
import { ActionIcons } from "./ActionIcons";
import SummaryCardsUI from "./SummaryCardsUI";
import { TransactionListUI } from "./TransactionListUI";

interface IncomeDashboardUIProps {
  transactions: Transaction[];
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
}

export function IncomeDashboardUI({
  transactions,
  totalIncome,
  totalExpense,
  totalBalance,
}: IncomeDashboardUIProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderUI />

      <ActionIcons />

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <SummaryCardsUI total={totalIncome} color="#10b981" iconName="trending-up" />
        <SummaryCardsUI total={totalExpense} color="#ef4444" iconName="trending-down" />
      </View>

      {/* Total Balance */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>{totalBalance.toFixed(2)}</Text>
      </View>

      {/* Transaction List */}
      <TransactionListUI transactions={transactions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  summaryContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 16,
  },
 

  expenseAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ef4444",
  },
  balanceCard: {
    backgroundColor: "#e5e5e5",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontWeight: "500",
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
  },
});
