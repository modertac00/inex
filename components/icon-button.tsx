import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

type Props = {
  /**
   * Either provide a React node (e.g. an Icon component) or an image source.
   * If both are provided, `icon` (React node) takes precedence.
   */
  icon?: React.ReactNode;
  iconSource?: ImageSourcePropType;
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  size?: number; // icon size (width & height for image)
  color?: string; // not applied automatically to images, useful for SVG/Icon components
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
  disabled?: boolean;
};

export default function IconButton({
  icon,
  iconSource,
  label,
  onPress,
  size = 36,
  color,
  style,
  labelStyle,
  accessibilityLabel,
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.7}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      disabled={disabled}
    >
      <View style={styles.iconWrapper}>
        {icon ? (
          // If a React node is provided, render it. Caller can pass a vector icon and use `color`/`size`.
          icon
        ) : iconSource ? (
          <Image
            source={iconSource}
            style={[
              styles.image,
              { width: size, height: size, tintColor: color ?? undefined },
            ]}
            resizeMode="contain"
          />
        ) : null}
      </View>

      <Text style={[styles.label, labelStyle]} numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    // default size will be overridden by inline style
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: "#222",
    textAlign: "center",
  },
});
