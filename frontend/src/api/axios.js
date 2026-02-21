import axios from "axios";
import tokenService from "./token-service"

const instance = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    "Content-type": "application/json"
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = tokenService.getLocalAccessToken()
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  });

export default instance;