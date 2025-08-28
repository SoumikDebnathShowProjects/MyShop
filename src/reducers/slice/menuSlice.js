// src/redux/menuSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { FaLayerGroup, FaPlusCircle, FaBoxes, FaClipboardList } from "react-icons/fa";

const initialState = [
  {
    path: "/dashboard/admin/create-category",
    name: "Manage Categories",
    icon: "FaLayerGroup"
  },
  {
    path: "/dashboard/admin/create-product",
    name: "Create Product",
    icon: "FaPlusCircle"
  },
  {
    path: "/dashboard/admin/products",
    name: "Manage Products",
    icon: "FaBoxes"
  },
  {
    path: "/dashboard/admin/orders",
    name: "Manage Orders",
    icon: "FaClipboardList"
  }
];

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuItems: (state, action) => action.payload
  }
});

export const { setMenuItems } = menuSlice.actions;
export default menuSlice.reducer;
