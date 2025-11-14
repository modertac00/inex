import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Session } from "@/types/inex";
import { useAppDispatch } from "@/store/hooks";
import { selectSession, unselectSession } from "@/store/slices/inexSlice";
import { TransactionListUI } from "./TransactionListUI";
type Props = {
  session: Session;
  isActive?: boolean;
};

export const CollapsedSessionUI: React.FC<Props> = ({ session, isActive }) => {
  const dispatch = useAppDispatch();
  
  // Calculate total balance (income - expense)
  const totalBalance = session.items.reduce((acc, item) => {
    return item.type === 'income' ? acc + item.amount : acc - item.amount;
  }, 0);

  return (
    <View>
    <TouchableOpacity 
      style={[styles.sessionContainer, isActive && styles.activeSession]}
      onPress={() => {
        if (isActive) {
          dispatch(unselectSession());
        } else {
          dispatch(selectSession(session.id));
        }
      }}
    >
      <View style={styles.sessionContent}>
        <Text style={styles.sessionTitle}>
          Session {String(session.id).padStart(2, '0')} [Total balance LKR {totalBalance.toFixed(2)}]
        </Text>
        <Ionicons 
          name="chevron-down" 
          size={20} 
          color="#666" 
          style={[styles.chevron, isActive && styles.chevronRotated]}
        />
      </View>
    </TouchableOpacity>
    {isActive && <TransactionListUI transactions={session.items} />}  
    </View>
  );
};

const styles = StyleSheet.create({
  sessionContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeSession: {
    backgroundColor: "#e3f2fd",
    borderColor: "#2196f3",
    borderWidth: 1,
  },
  sessionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    flex: 1,
  },
  chevron: {
    marginLeft: 8,
  },
  chevronRotated: {
    transform: [{ rotate: "180deg" }],
  },
});
