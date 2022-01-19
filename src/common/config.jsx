import dotenv from "dotenv";

dotenv.config();

const Configs = {
  api_url:
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/contents/post",
  env: process.env.NODE_ENV || "development",
  version: process.env.NEXT_PUBLIC_VERSION || "1",
  site_name: "Hampton",
  title: "4DV",
  description: "4DV",
  locale: "kr",
};

export default Configs;
