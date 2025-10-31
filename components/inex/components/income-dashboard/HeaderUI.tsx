import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
type Props = {};

const HeaderUI: React.FC<Props> = () => {

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerButton}>
        <Ionicons name="chevron-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>InEx</Text>
      <TouchableOpacity style={styles.headerButton}>
        <Ionicons name="ellipsis-horizontal" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
