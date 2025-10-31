export type Transaction = {
  id: string;
  time: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}