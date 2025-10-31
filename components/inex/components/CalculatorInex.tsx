import React from "react";
import CalculatorInexUI from "./CalculatorInexUI";

type Props = {};

const CalculatorInex: React.FC<Props> = ({}) => {
  const [value, setValue] = React.useState("");
  const [type , setType] = React.useState("");

  return (
   <CalculatorInexUI />
  );
};

export default CalculatorInex;

