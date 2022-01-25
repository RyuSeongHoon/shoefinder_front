import axios from "axios";
import { API } from "./api.config";

export const ApiService = (resourceName) => {
  const create = async (values) => {
    console.log("api 실행전");
    const { data } = await API.post(`${resourceName}/`, values);
    console.log("api 실행완료, data", data);
    return data;
  };

  const infiniteQuery =
    (params) =>
    async ({ pageParam = 1 }) => {
      const { data } = await API.get(`${resourceName}?cursor=${pageParam}`, {
        params,
      });
      return data;
    };

  return {
    create,
    infiniteQuery,
  };
};
