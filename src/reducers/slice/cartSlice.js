// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // array of products
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const exists = state.items.find(p => p._id === action.payload._id);
      if (!exists) state.items.push(action.payload);
    },
    remove: (state, action) => {
      state.items = state.items.filter(p => p._id !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
