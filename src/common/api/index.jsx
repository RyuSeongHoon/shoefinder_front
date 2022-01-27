import { ApiService } from "./api.service.jsx";

export const {
  infiniteQuery: getInfiniteContents,
  query: getContents,
  get: getContent,
  create: createContent,
} = ApiService("test");
