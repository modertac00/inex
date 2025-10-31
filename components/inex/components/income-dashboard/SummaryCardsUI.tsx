import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  total: number;
  color: string;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
};

const SummaryCardsUI: React.FC<Props> = ({ total, color, iconName }) => {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryHeader}>
        <Ionicons name={iconName} size={16} color={color} />
        <Text style={styles.summaryTitle}>Total Income</Text>
      </View>
      <Text style={[styles.incomeAmount, { color }]}>{total.toFixed(2)}</Text>
    </View>
  );
};

export default SummaryCardsUI;

const styles = StyleSheet.create({
  summaryCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: "500",
  },
  incomeAmount: {
    fontSize: 24,
    fontWeight: "700",

  },
});
