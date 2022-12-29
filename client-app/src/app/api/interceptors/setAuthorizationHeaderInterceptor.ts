import { AxiosRequestConfig } from "axios";
import { store } from "../../stores/store";

const setAuthorizationHeaderInterceptor = (config: AxiosRequestConfig<any>) => {
  const { token } = store.commonStore;
  if (token && config?.headers)
    config.headers.Authorization = `Bearer ${token}`;
  return config;
};

export default setAuthorizationHeaderInterceptor;
