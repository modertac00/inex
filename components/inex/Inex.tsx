import React from "react";
import {
  StyleSheet,
} from "react-native";
import InexUI from "./InexUI";

type Props = {
  title?: string;
  loading?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  children?: React.ReactNode;
};

const Inex: React.FC<Props> = ({
  title = "Page Title",
  loading = false,
  showBack = false,
  onBack,
  children,
}) => {
  const [value, setValue] = React.useState("");

  return (
    <InexUI />
  );
};

export default Inex;

const styles = StyleSheet.create({

});
