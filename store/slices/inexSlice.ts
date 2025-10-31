import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export interface InexState {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  loading: boolean;
  error: string | null;
}

const initialState: InexState = {
  transactions: [],
  totalIncome: 0,
  totalExpenses: 0,
  balance: 0,
  loading: false,
  error: null,
};

const inexSlice = createSlice({
  name: 'inex',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      if (action.payload.type === 'income') {
        state.totalIncome += action.payload.amount;
      } else {
        state.totalExpenses += action.payload.amount;
      }
      state.balance = state.totalIncome - state.totalExpenses;
    },
    removeTransaction: (state, action: PayloadAction<string>) => {
      const transactionIndex = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload
      );
      if (transactionIndex !== -1) {
        const transaction = state.transactions[transactionIndex];
        if (transaction.type === 'income') {
          state.totalIncome -= transaction.amount;
        } else {
          state.totalExpenses -= transaction.amount;
        }
        state.transactions.splice(transactionIndex, 1);
        state.balance = state.totalIncome - state.totalExpenses;
      }
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const transactionIndex = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id
      );
      if (transactionIndex !== -1) {
        const oldTransaction = state.transactions[transactionIndex];
        // Remove old transaction from totals
        if (oldTransaction.type === 'income') {
          state.totalIncome -= oldTransaction.amount;
        } else {
          state.totalExpenses -= oldTransaction.amount;
        }
        
        // Add new transaction to totals
        if (action.payload.type === 'income') {
          state.totalIncome += action.payload.amount;
        } else {
          state.totalExpenses += action.payload.amount;
        }
        
        state.transactions[transactionIndex] = action.payload;
        state.balance = state.totalIncome - state.totalExpenses;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearTransactions: (state) => {
      state.transactions = [];
      state.totalIncome = 0;
      state.totalExpenses = 0;
      state.balance = 0;
    },
  },
});

export const {
  addTransaction,
  removeTransaction,
  updateTransaction,
  setLoading,
  setError,
  clearTransactions,
} = inexSlice.actions;

export default inexSlice.reducer;