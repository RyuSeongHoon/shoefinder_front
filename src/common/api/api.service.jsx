import axios from "axios";
import { API } from "./api.config";

export const ApiService = (resourceName) => {
  const create = async (values) => {
    const { data } = await API.post(`${resourceName}/`, values);
    return data;
  };

  const infiniteQuery = (sub) => async () => {
    const { data } = await API.get(`${resourceName}/${sub}`, {
      params: {
        sub_id: sub,
      },
    });
    return data;
  };

  return {
    create,
    infiniteQuery,
  };
};
