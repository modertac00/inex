import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

type Props = TouchableOpacityProps & {
  icon: string;                // Ionicon name
  label: string;               // Text below the icon
  color?: string;              // Icon + border color
  backgroundColor?: string;    // Circle background
  labelStyle?: TextStyle;      // Custom label style
  containerStyle?: ViewStyle;  // Extra wrapper style
};

export const IconButton: React.FC<Props> = ({
  icon,
  label,
  color = "#007AFF",
  backgroundColor = "#f0f8ff",
  labelStyle,
  containerStyle,
  ...rest 
}) => {
  return (
    <TouchableOpacity style={[styles.actionButton, containerStyle]} {...rest}>
      <View style={[styles.actionIcon, { borderColor: color, backgroundColor }]}>
        <Ionicons name={icon as any} size={24} color={color} />
      </View>
      <Text style={[styles.actionLabel, labelStyle, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    alignItems: "center",
    gap: 8,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
});
