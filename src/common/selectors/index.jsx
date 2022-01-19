import _ from "lodash";
import { selector } from "recoil";
import { isAuthenticated, currentUserState } from "../atom/index";

export const isAuthenticatedSelector = selector({
  key: "isAuthenticatedSelector",
  get: ({ get }) => get(isAuthenticated),
  set: ({ set }, newisAuthenticated) =>
    set(isAuthenticated, newisAuthenticated),
});

export const authSelector = selector({
  key: "authSelector",
  get: ({ get }) => get(currentUserState),
  set: ({ set }, newcurrentUserState) =>
    set(currentUserState, newcurrentUserState),
});
