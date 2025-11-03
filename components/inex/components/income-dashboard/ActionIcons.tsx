import React from "react";
import ActionIconsUI from "./ActionIconsUI";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addSession, selectSession } from "@/store/slices/inexSlice";
import { selectSelectedSession, selectSessions } from "@/store/selectors/inexSelectors";

type Props = {};

export const ActionIcons: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const selectedSession = useAppSelector(selectSelectedSession);
  const sessions = useAppSelector(selectSessions);

  const endSession = () => {
    if (!selectedSession || selectedSession.items.length === 0) {
      console.log("No active session with items to end.");
      return;
    }

    console.log("Ending current session...", selectedSession.id);
    
    // Create a new session for the next entries
    const newSessionId = sessions.length; // This will be the ID of the new session
    dispatch(addSession({
      date: new Date().toISOString().split('T')[0], // Today's date
      items: [],
    }));

    // Select the new session
    dispatch(selectSession(newSessionId));
    
    console.log(`Session ${selectedSession.id} ended. New session ${newSessionId} started.`);
  };

  return <ActionIconsUI endSession={endSession} />;
};
