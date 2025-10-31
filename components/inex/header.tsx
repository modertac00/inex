import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import IconButton from "../icon-button";

type Props = {
//   onPress?: () => void;
};

const buttonGroup: Array<[{
    iconSource: ImageSourcePropType;
    onPress: () => void;
    label: string;
}]> = [
    [
  {
        iconSource: require("../../assets/images/favicon.png"),
        onPress: () => {},
        label: "report",
    }
    ],
  [
    {
        iconSource: require("../../assets/images/favicon.png"),
        onPress: () => {},
        label: "report",
    }
  ]
]

const Header: React.FC<Props> = ({
//   onPress,
}) => {
  return (
    <View style={styles.container}>
      {buttonGroup.map((buttons, index) => (
        <View key={index} style={styles.buttonGroup}>
          {buttons.map((button, btnIndex) => (
            <IconButton
              key={btnIndex}
              iconSource={button.iconSource}
              onPress={button.onPress}
              label={button.label}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonGroup: {
    flexDirection: "row",
  },
  buttons: {
    flexDirection: "row",
  }
});
