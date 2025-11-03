import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Session } from "@/types/inex";
import { useAppDispatch } from "@/store/hooks";
import { selectSession } from "@/store/slices/inexSlice";
type Props = {
  session: Session;
};

export const CollapsedSessionUI: React.FC<Props> = ({ session }) => {
    const dispatch = useAppDispatch();
  return (
    <TouchableOpacity onPress={() => {
        dispatch(selectSession(session.id));
    }}>
    <View key={session.id} style={styles.transactionItem} >
      <Text
        style={[
          styles.transactionDescription,
          session.items.length > 0 ? styles.incomeText : styles.expenseText,
        ]}
      >
        {session.date} - {session.items.length} items
      </Text>
      <Text
        style={[
          styles.transactionAmount,
          session.items.length > 0 ? styles.incomeText : styles.expenseText,
        ]}
      >
        LKR{" "}
        {session.items.reduce((acc, item) => acc + item.amount, 0).toFixed(2)}
      </Text>
    </View>
    </TouchableOpacity>
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
