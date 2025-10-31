import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Transaction } from "../../type";
type Props = {
    transactions: Transaction[];
};

export const TransactionListUI: React.FC<Props> = ({ transactions }) => {

  return (
   <View style={styles.transactionList}>
           {transactions.map((transaction) => (
             <View key={transaction.id} style={styles.transactionItem}>
               <Text
                 style={[
                   styles.transactionDescription,
                   transaction.type === "income"
                     ? styles.incomeText
                     : styles.expenseText,
                 ]}
               >
                 {transaction.time} - {transaction.description}
               </Text>
               <Text
                 style={[
                   styles.transactionAmount,
                   transaction.type === "income"
                     ? styles.incomeText
                     : styles.expenseText,
                 ]}
               >
                 LKR {transaction.amount.toFixed(2)}
               </Text>
             </View>
           ))}
         </View>
  );
};


const styles = StyleSheet.create({

 transactionList: {
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 12,
    paddingBottom: 24,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: "500",
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "600",
  },
    incomeText: {
    color: "#10b981",
  },
  expenseText: {
    color: "#ef4444",
  },
});
