import React, { useState } from "react";
import CalculatorUI from "./CalculatorUI";
import { CalculatorButton } from "./types";

export function Calculator({ onSubmit }: CalculatorButton) {
  const [display, setDisplay] = useState("0");

  const handleNumberPress = (num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperatorPress = (operator: string) => {
    setDisplay((prev) => {
        const trimmed = prev.trimEnd();
        const lastChar = trimmed.charAt(trimmed.length - 1);
        const operators = ["+", "-", "*", "/"];

        if (operators.includes(lastChar)) {
            // replace the last operator with the new one (keep spacing)
            return trimmed.slice(0, -1) + operator ;
        }

        return prev + operator;
    });
  };

  const handleDecimalPress = () => {
    if (!display.includes(".")) {
      setDisplay((prev) => prev + ".");
    }
  };

  const handleClear = () => {
    setDisplay("0");
  };

  const handleAdd = () => {
    onSubmit(display);
  };

  return (
    <CalculatorUI
      value={display}
      handleNumberPress={handleNumberPress}
      handleOperatorPress={handleOperatorPress}
      handleDecimalPress={handleDecimalPress}
      handleClear={handleClear}
    />
  );
}