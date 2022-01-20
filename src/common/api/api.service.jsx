import { API } from "./api.config";

export const ApiService = (resourceName) => {
  const create = (params) => async (payload) => {
    const { data } = await API.post(`/${resourceName}`, payload, { params });
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
