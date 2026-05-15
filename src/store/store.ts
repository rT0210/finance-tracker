import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./slices/transactionsSlice";

export const store = configureStore({
    reducer: {
        transaction: transactionReducer
    }
})

export type RootState = ReturnType<typeof store.getState>