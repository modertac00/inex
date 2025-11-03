import { InExItem, InExState, Session } from '@/types/inex';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const initialState: InExState = {
  sessions: [],
  selectedSessionId: undefined,
  totalIncome: 0,
  totalExpense: 0,
  totalBalance: 0,
  currentSession: 0,
};

const inExSlice = createSlice({
  name: 'inEx',
  initialState,
  reducers: {
    // ✅ Create session automatically with UUID if not provided
    addSession(state, action: PayloadAction<Omit<Session, 'id'>>) {
      const newSession: Session = {
        id: state.sessions.length,
        ...action.payload,
      };
      state.selectedSessionId = state.sessions.length;
      state.sessions.push(newSession);
    },

    deleteSession(state, action: PayloadAction<number>) {
      state.sessions = state.sessions.filter(s => s.id !== action.payload);
    },

    selectSession(state, action: PayloadAction<number | undefined>) {
      state.selectedSessionId = action.payload;
    },

    // ✅ Automatically generate item UUID
    addItem(
      state,
      action: PayloadAction<{
        sessionId: number;
        item: Omit<InExItem, 'id'>;
      }>
    ) {
      const session = state.sessions.find(s => s.id === action.payload.sessionId);
      if (session) {
        const newItem: InExItem = {
          id: uuidv4(),
          ...action.payload.item,
        };
        session.items.push(newItem);
      }
    },

    deleteItem(state, action: PayloadAction<{ sessionId: number; itemId: string }>) {
      const session = state.sessions.find(s => s.id === action.payload.sessionId);
      if (session) {
        session.items = session.items.filter(i => i.id !== action.payload.itemId);
      }
    },

    updateItem(state, action: PayloadAction<{ sessionId: number; item: InExItem }>) {
      const session = state.sessions.find(s => s.id === action.payload.sessionId);
      if (session) {
        const index = session.items.findIndex(i => i.id === action.payload.item.id);
        if (index !== -1) session.items[index] = action.payload.item;
      }
    },
  },
});

export const {
  addSession,
  deleteSession,
  selectSession,
  addItem,
  deleteItem,
  updateItem,
} = inExSlice.actions;

export default inExSlice.reducer;
