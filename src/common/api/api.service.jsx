import { API } from "./api.config";

export const ApiService = (resourceName) => {
  const create = (params) => async (payload) => {
    const { data } = await API.post(`/${resourceName}`, payload, { params });
    return data;
  };

  return {
    create,
  };
};
