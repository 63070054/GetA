import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const api = axios.create({
  baseURL: "",
});

const AxiosInterceptor = ({ children, setIsLoading }) => {
  useEffect(() => {
    const resInterceptor = (response) => {
      setIsLoading(false);
      return response;
    };

    const errInterceptor = (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    };

    const reqInterceptor = (config) => {
      const token = Cookies.get("token");

      if (token) {
        config.headers["Authorization"] = token;
      }
      setIsLoading(true);

      return config;
    };

    const apiResInterceptor = api.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    const apiReqInterceptor = api.interceptors.request.use(reqInterceptor);

    return () => {
      api.interceptors.response.eject(apiResInterceptor),
        api.interceptors.request.eject(apiReqInterceptor);
    };
  }, []);
  return children;
};

export default api;
export { AxiosInterceptor };
