import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Transaction = {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
};

interface TransactionsState {
    transactions: Transaction[]
}

const initialState: TransactionsState = {
    transactions: [] 
}

export const TransactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        addTransaction(state, action: PayloadAction<Transaction>) {
            state.transactions.push(action.payload)
        },
        delTransaction(state, action: PayloadAction<number>) {
            state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload)
        },
        updateTransaction(state, action: PayloadAction<Transaction>) {
            const index = state.transactions.findIndex((transaction) => transaction.id === action.payload.id)
            state.transactions[index] = action.payload
        }
    }
})

export const {addTransaction, delTransaction} = TransactionSlice.actions
export default TransactionSlice.reducer