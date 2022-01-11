import _ from "lodash";
import { selector } from "recoil";
import { isAuthenticated } from "../atom/index";

export const isAuthenticatedSelector = selector({
  key: "isAuthenticatedSelector",
  get: ({ get }) => get(isAuthenticated),
  set: ({ set }, newisAuthenticated) =>
    set(isAuthenticated, newisAuthenticated),
});
