import _ from "lodash";
import { selector } from "recoil";
import {
  isAuthenticated,
  currentUserState,
  subId,
  uuid,
  post_id,
} from "../atom/index";

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

export const subIdSelector = selector({
  key: "currentSubId",
  get: ({ get }) => get(subId),
  set: ({ set }, newsubId) => set(subId, newsubId),
});

export const post_idSelector = selector({
  key: "currentPost_id",
  get: ({ get }) => get(post_id),
  set: ({ set }, newpost_id) => set(post_id, newpost_id),
});
