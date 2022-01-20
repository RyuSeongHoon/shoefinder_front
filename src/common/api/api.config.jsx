import axios from "axios";
import Configs from "../config";

const { api_url: API_URL, version: VERSION } = Configs;

const headerConfig = {
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Version": `v${VERSION}`,
  },
};

const API = axios.create(headerConfig);

export { API, API_URL, VERSION };
