import axios, { AxiosResponse } from "axios";
import httpErrorCodeInterceptor from "./interceptors/httpErrorCodeInterceptor";
import setAuthorizationHeaderInterceptor from "./interceptors/setAuthorizationHeaderInterceptor";
import sleepInterceptor from "./interceptors/sleepInterceptor";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.interceptors.request.use(setAuthorizationHeaderInterceptor);
axios.interceptors.response.use(sleepInterceptor, httpErrorCodeInterceptor);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const requests = {
  list: <T>(url: string = "") => axios.get<T[]>(url).then(responseBody),
  get: <T>(url: string = "") => axios.get<T>(url).then(responseBody),
  post: <T, U>(url: string = "", body: T) =>
    axios.post<U>(url, body).then(responseBody),
  postNoBody: <U>(url: string = "") => axios.post<U>(url).then(responseBody),
  put: <T, U>(url: string = "", body: T) =>
    axios.put<U>(url, body).then(responseBody),
  delete: <T>(url: string = "") => axios.delete<T>(url).then(responseBody),
};

export default requests;
