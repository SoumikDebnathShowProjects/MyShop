// src/store/adminAtoms.js
import { atom } from "recoil";

export const adminMenuAtom = atom({
  key: "adminMenuAtom",
  default: [
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
  ]
});

export const adminStatsAtom = atom({
  key: "adminStatsAtom",
  default: {
    ordersCount: 0,
    productsCount: 0,
    categoriesCount: 0
  }
});
