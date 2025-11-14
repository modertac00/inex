import React from "react";
import ActionIconsUI from "./ActionIconsUI";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addSession, selectSession, undo } from "@/store/slices/inexSlice";
import { selectSelectedSession, selectSessions } from "@/store/selectors/inexSelectors";

type Props = {};

export const ActionIcons: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const selectedSession = useAppSelector(selectSelectedSession);
  const sessions = useAppSelector(selectSessions);

  const endSession = () => {
    if (!selectedSession || selectedSession.items.length === 0) {
      return;
    }


    // Create a new session for the next entries
    const newSessionId = sessions.length; // This will be the ID of the new session
    dispatch(addSession({
      date: new Date().toISOString().split('T')[0], // Today's date
      items: [],
    }));

    // Select the new session
    dispatch(selectSession(newSessionId));
    
  };

  const undoAction = () => {
    // Dispatch undo action
    dispatch(undo());
  }

  return <ActionIconsUI endSession={endSession} undoAction={undoAction} />;
};
