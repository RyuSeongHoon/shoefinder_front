import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

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

export const subId = atom({
  key: "subId",
  default: "",
});

export const post_id = atom({
  key: "post_id",
  default: uuidv4(),
});
