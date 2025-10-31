import React, { memo } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  GestureResponderEvent,
  Platform,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  title?: string;
  onPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  testID?: string;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

/**
 * A simple, accessible, and themeable React Native Button component.
 * - Uses Pressable for ripple/opacity feedback.
 * - Supports variants, sizes, loading, disabled state, and optional icons.
 */
const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "medium",
  iconLeft,
  iconRight,
  testID,
  accessibilityLabel,
  style,
  contentStyle,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  const backgroundColor =
    variant === "primary"
      ? isDisabled
        ? styles.colors.primaryDisabled
        : styles.colors.primary
      : variant === "secondary"
      ? isDisabled
        ? styles.colors.secondaryDisabled
        : styles.colors.secondary
      : "transparent";

  const textColor =
    variant === "primary"
      ? styles.colors.white
      : variant === "secondary"
      ? styles.colors.primary
      : isDisabled
      ? styles.colors.muted
      : styles.colors.primary;

  const indicatorColor = variant === "primary" ? "#fff" : styles.colors.primary;

  const paddingStyle =
    size === "small"
      ? styles.sizeSmall
      : size === "large"
      ? styles.sizeLarge
      : styles.sizeMedium;

  return (
    <Pressable
      testID={testID}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: isDisabled }}
      onPress={isDisabled ? undefined : onPress}
      android_ripple={
        Platform.OS === "android" && variant !== "ghost"
          ? { color: "rgba(0,0,0,0.08)" }
          : undefined
      }
      style={({ pressed }) => [
        styles.base,
        { backgroundColor },
        paddingStyle,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      <View style={[styles.content, contentStyle]}>
        {iconLeft ? <View style={styles.iconLeft}>{iconLeft}</View> : null}

        {loading ? (
          <ActivityIndicator
            size="small"
            color={typeof indicatorColor === "string" ? indicatorColor : "#fff"}
            style={styles.indicator}
          />
        ) : title ? (
          <Text
            numberOfLines={1}
            style={[styles.text, { color: textColor }, textStyle]}
          >
            {title}
          </Text>
        ) : null}

        {iconRight ? <View style={styles.iconRight}>{iconRight}</View> : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignSelf: "stretch",
    minWidth: 64,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  indicator: {
    marginHorizontal: 4,
  },
  disabled: {
    opacity: 1, // keep visual handled by colors; still use reduced contrast
  },
  pressed: {
    transform: [{ scale: 0.997 }],
  },
  sizeSmall: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  sizeMedium: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  sizeLarge: {
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  colors: {
    primary: "#0B63F6",
    primaryDisabled: "#8FB0FF",
    secondary: "#E6F0FF",
    secondaryDisabled: "#F5F8FF",
    white: "#FFFFFF",
    primaryTextOnSecondary: "#0B63F6",
    muted: "#9AA4B2",
  } as { [k: string]: string },
});

export default memo(Button);
