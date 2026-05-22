import { createSlice } from "@reduxjs/toolkit";

export type Category = {
  id: number;
  name: string;
};

const initialState = {
  categories: [
    { id: 1, name: "Еда" },
    { id: 2, name: "Транспорт" },
    { id: 3, name: "Кафе" },
    { id: 4, name: "Развлечения" },
    { id: 5, name: "Зарплата" },
    { id: 6, name: "Другое" },
  ] as Category[],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategories(state, action) {
      state.categories.push(action.payload);
    },
    delCategories(state, action) {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload,
      );
    
    },
    changeCategories(state, action) {
        const index = state.categories.findIndex((item) => item.id === action.payload.id)
        state.categories[index] = action.payload
    }
  },
});

export const { addCategories, delCategories, changeCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
