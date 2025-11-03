import React, { useState } from "react";
import CalculatorInexUI from "./CalculatorInexUI";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, addSession } from "@/store/slices/inexSlice";
import { selectSelectedSession, selectSessions } from "@/store/selectors/inexSelectors";
import { InExItem } from "@/types/inex";

type Props = {};

const CalculatorInex: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const selectedSession = useAppSelector(selectSelectedSession);
  const sessions = useAppSelector(selectSessions);
  
  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState<string>("");

  const handleSubmit = (value: string) => {
    // Convert string to number
    const numericValue = eval(value);
    if (isNaN(numericValue)) {
      console.error('Invalid amount:', value);
      return;
    }
    // Create a session if none exists
    if (sessions.length === 0) {
      dispatch(addSession({
        date: new Date().toISOString().split('T')[0], // Today's date
        items: [],
      }));
    }

    // Get the session ID (use 0 if it's the first session we just created)
    const sessionId = selectedSession?.id ?? 0;

    // Create the new InExItem
    const newItem: Omit<InExItem, 'id'> = {
      time: new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      title: category,
      description: value,
      amount: numericValue,
      type: type,
    };

    // Dispatch the addItem action
    dispatch(addItem({
      sessionId,
      item: newItem,
    }));
  };

  return (
    <CalculatorInexUI
      setType={setType}
      onSubmit={handleSubmit}
      selectCategory={setCategory}
    />
  );
};

export default CalculatorInex;
