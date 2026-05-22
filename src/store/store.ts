import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./slices/transactionsSlice";
import  categoryReducer  from "./slices/categoriesSlice";

export const store = configureStore({
    reducer: {
        transaction: transactionReducer,
        categories: categoryReducer
    }
})

export type RootState = ReturnType<typeof store.getState>