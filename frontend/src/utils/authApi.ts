import axios from "axios";
import Cookies from "js-cookie";
import { SERVER_URL } from "@/config";

const authApi = axios.create({
  baseURL: SERVER_URL,
});

authApi.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
  return config;
});

export default authApi;