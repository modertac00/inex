import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import CalculatorInex from "./components/CalculatorInex";
import IncomeDashboard from "./components/income-dashboard/IncomeDashboard";

type Props = {
  title?: string;
  loading?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  children?: React.ReactNode;
};

const InexUI: React.FC<Props> = ({
  title = "Page Title",
  loading = false,
  showBack = false,
  onBack,
  children,
}) => {
  const [value, setValue] = React.useState("");

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <IncomeDashboard />
        </View>
        <View style={styles.bottomSection}>
          <CalculatorInex />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default InexUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: "#fff",
    margin: 20,
  },
  safeArea: {
    flex: 1,
    height: '100%',
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  bottomSection: {
    padding: 16,
  }
});
