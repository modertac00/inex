export type InExType = 'income' | 'expense';

export interface InExItem {
  id: string; // will store uuid v4
  time: string;
  title: string;
  description: string;
  amount: number;
  type: InExType;
}

export interface Session {
  id: number;
  date: string;
  items: InExItem[];
  // notes?: string;
}

export interface InExState {
  sessions: Session[];
  selectedSessionId?: number;
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
  currentSession: number;
}
