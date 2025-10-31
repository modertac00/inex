import { Button } from "@/components/atoms/buttons/Button";
import { Calculator } from "@/components/molecules/calculator/Calculator";
import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

const { height } = Dimensions.get("window");

const CalculatorInexUI: React.FC = () => {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current; // Start hidden

  const openCalculator = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeCalculator = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  return (
    <View style={styles.header}>
      {/* Slide-up Calculator + Overlay */}
      {visible ? (
        <>
          {/* Dim background overlay */}
          <TouchableWithoutFeedback onPress={closeCalculator}>
            <Animated.View style={[styles.overlay, { opacity: slideAnim.interpolate({
              inputRange: [0, height],
              outputRange: [0.5, 0],
            }) }]} />
          </TouchableWithoutFeedback>

          {/* Calculator Panel */}
          <Animated.View
            style={[
              styles.calculatorContainer,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Calculator onSubmit={(v) => setValue(v)} />
            <Button title="Add" onPress={closeCalculator} />
          </Animated.View>
        </>
      ) : <View style={styles.controlButtonsContainer}>
        <Button
          title="Income"
          onPress={openCalculator}
          variant="outline"
          buttonStyle={styles.incomeButton}
          textStyle={styles.incomeButtonText}
        />
        <Button
          title="Expense"
          onPress={openCalculator}
          variant="outline"
          buttonStyle={styles.expenseButton}
          textStyle={styles.expenseButtonText}
        />
      </View>}
        
        
    </View>
  );
};

export default CalculatorInexUI;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  incomeButton: {
    borderColor: "#10b981",
    flex: 1,
  },
  incomeButtonText: {
    color: "#10b981",
  },
  expenseButton: {
    borderColor: "#ef4444",
    flex: 1,
  },
  expenseButtonText: {
    color: "#ef4444",
  },
  controlButtonsContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  calculatorContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#e8e8e8",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    // shadowOpacity: 0.25,
    // shadowOffset: { width: 0, height: -3 },
    shadowRadius: 8,
    elevation: 8,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
  },
});
