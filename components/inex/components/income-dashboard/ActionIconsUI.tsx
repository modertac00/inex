import { IconButton } from "@/components/atoms/buttons/IconButton";
import React from "react";
import { View, StyleSheet } from "react-native";

type ActionIconsUIProps = {
  endSession: () => void;
  undoAction: () => void;
};

const ActionIconsUI: React.FC<ActionIconsUIProps> = ({
  endSession,
  undoAction,
}) => {
  return (
    <View style={styles.actionsContainer}>
      <IconButton icon="bar-chart" label="Report" />
      <IconButton icon="settings-outline" label="Settings" />
      <IconButton icon="arrow-undo" label="Undo" onPress={undoAction} />
      <IconButton
        icon="power"
        label="End Session"
        color="#ef4444"
        backgroundColor="#fef2f2"
        onPress={endSession}
      />
    </View>
  );
};

export default ActionIconsUI;

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "white",
    marginTop: 8,
  },
});
