import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Transaction } from "../../type";
import HeaderUI from "./HeaderUI";
import { ActionIcons } from "./ActionIcons";
import SummaryCardsUI from "./SummaryCardsUI";
import { TransactionListUI } from "./TransactionListUI";
import { Session } from "@/types/inex";
import { CollapsedSessionUI } from "./CollapsedSessionUI";
interface IncomeDashboardUIProps {
  sessions: Session[];
  selectedSessionId?: number;
  transactions: Transaction[];
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
}

export function IncomeDashboardUI({
  sessions,
  transactions,
  selectedSessionId,
  totalIncome,
  totalExpense,
  totalBalance,
}: IncomeDashboardUIProps) {
  const activeSession = sessions[sessions?.length - 1] || null;
  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderUI />

      <ActionIcons />

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <SummaryCardsUI
          total={totalIncome}
          color="#10b981"
          iconName="trending-up"
        />
        <SummaryCardsUI
          total={totalExpense}
          color="#ef4444"
          iconName="trending-down"
        />
      </View>

      {/* Total Balance */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>{totalBalance.toFixed(2)}</Text>
      </View>
      {activeSession ? (
        <View>
          <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
            Active Session
          </Text>
          <TransactionListUI
            key={activeSession.id}
            transactions={activeSession.items}
          />
        </View>
      ) : (
        <Text>No transactions available</Text>
      )}
      {sessions.map((session: Session, index: number) => {
        if (index !== sessions.length - 1) {
          return (
            <CollapsedSessionUI
              key={session.id}
              session={session}
              isActive={session.id === selectedSessionId}
            />
          );
        } else {
          return null;
        }
      })}
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
