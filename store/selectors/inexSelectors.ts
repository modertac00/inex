import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { InExItem, Session } from '@/types/inex';

// Basic selectors
export const selectInExState = (state: RootState) => state.inex;
export const selectSessions = (state: RootState) => state.inex.sessions;
export const selectSelectedSessionId = (state: RootState) => state.inex.selectedSessionId;

// Memoized selectors using createSelector
export const selectSelectedSession = createSelector(
  [selectSessions, selectSelectedSessionId],
  (sessions: Session[], selectedSessionId?: number): Session | undefined => {
    if (selectedSessionId !== undefined) {
      return sessions.find(session => session.id === selectedSessionId);
    }
    // Return first session if no specific selection
    return sessions[0];
  }
);

export const selectSelectedSessionItems = createSelector(
  [selectSelectedSession],
  (selectedSession?: Session): InExItem[] => {
    return selectedSession?.items || [];
  }
);

export const selectActiveSessionId = createSelector(
  [selectSessions],
  (sessions: Session[]): number | undefined => {
    if (sessions.length === 0) return undefined;
    return sessions[sessions.length - 1].id;
  }
);

export const selectTotalIncome = createSelector(
  [selectSelectedSessionItems],
  (items: InExItem[]): number => {
    return items
      .filter(item => item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0);
  }
);

export const selectTotalExpense = createSelector(
  [selectSelectedSessionItems],
  (items: InExItem[]): number => {
    return items
      .filter(item => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0);
  }
);

export const selectBalance = createSelector(
  [selectTotalIncome, selectTotalExpense],
  (totalIncome: number, totalExpense: number): number => {
    return totalIncome - totalExpense;
  }
);

export const selectDashboardData = createSelector(
  [selectSelectedSessionItems, selectTotalIncome, selectTotalExpense, selectBalance],
  (items, totalIncome, totalExpense, balance) => ({
    items,
    totalIncome,
    totalExpense,
    balance,
  })
);

// Session management selectors
export const selectSessionById = (sessionId: number) =>
  createSelector(
    [selectSessions],
    (sessions: Session[]): Session | undefined => {
      return sessions.find(session => session.id === sessionId);
    }
  );

export const selectSessionCount = createSelector(
  [selectSessions],
  (sessions: Session[]): number => sessions.length
);

export const selectHasSessions = createSelector(
  [selectSessionCount],
  (count: number): boolean => count > 0
);