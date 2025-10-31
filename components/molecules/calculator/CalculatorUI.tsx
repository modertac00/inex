import React, { FC } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { BUTTON_ROWS } from "./constants";

interface CalculatorUIProps {
  handleNumberPress: (num: string) => void;
  handleOperatorPress: (operator: string) => void;
  handleDecimalPress: () => void;
  handleClear: () => void;
  value: string;
}

const CalculatorUI: FC<CalculatorUIProps> = ({
  handleClear,
  handleDecimalPress,
  handleNumberPress,
  handleOperatorPress,
  value,
}) => {
  return (
    <View style={styles.calculator}>
      {/* Display */}
      <View style={styles.display}>
        <Text style={styles.displayText}>{value}</Text>
      </View>

      {/* Button Grid */}
      <View style={styles.buttonGrid}>
      {BUTTON_ROWS.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((button) => (
            <TouchableOpacity
              key={button.label}
              style={
                button.type === "number" ? styles.button : styles.operatorButton
              }
              onPress={() => {
                if (button.type === "number") {
                  handleNumberPress(button.label);
                } else if (button.type === "operator") {
                  handleOperatorPress(button.label);
                } else if (button.type === "decimal") {
                  handleDecimalPress();
                } else if (button.type === "clear") {
                  handleClear();
                }
              }}
            >
              <Text
                style={
                  button.type === "number"
                    ? styles.buttonText
                    : styles.operatorText
                }
              >
                {button.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      </View>
    </View>
  );
};

export default CalculatorUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  calculator: {
    width: "100%",
    backgroundColor: "#e8e8e8",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  display: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: "flex-end",
    minHeight: 50,
    justifyContent: "center",
  },
  displayText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  buttonGrid: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  operatorButton: {
    flex: 1,
    backgroundColor: "#5a5a5a",
    borderRadius: 8,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  operatorText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  addButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
