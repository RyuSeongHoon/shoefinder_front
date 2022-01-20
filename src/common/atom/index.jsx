import { atom } from "recoil";

export const isAuthenticated = atom({
  key: "isAuthenticated",
  default: false,
});

const initialCurrentUser = {
  email: "",
  isAuthenticated: false,
};

export const currentUserState = atom({
  key: "currentUser",
  default: initialCurrentUser,
});
