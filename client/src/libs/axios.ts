import baseAxios from "axios";
import { BACKEND_URL } from "../constants";

export const axios = baseAxios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});
