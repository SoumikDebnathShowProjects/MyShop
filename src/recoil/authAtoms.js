// recoil/authAtoms.js
import { atom } from "recoil";

export const authAtom = atom({
  key: "authAtom",
  default: {
    user: null,
  },
});
