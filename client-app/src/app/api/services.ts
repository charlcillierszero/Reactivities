import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/Activity";

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use((response) =>
  sleep(1000)
    .then(() => response)
    .catch((error) => {
      console.error(error);
      return Promise.reject(error);
    })
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  list: <T>(url: string = "") => axios.get<T[]>(url).then(responseBody),
  get: <T>(url: string = "") => axios.get<T>(url).then(responseBody),
  post: <T, U>(url: string = "", body: T) =>
    axios.post<U>(url, body).then(responseBody),
  put: <T, U>(url: string = "", body: T) =>
    axios.put<U>(url, body).then(responseBody),
  delete: <T>(url: string = "") => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.list<Activity>("/activities"),
  get: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) =>
    requests.post<Activity, void>("/activities", activity),
  update: (activity: Activity) =>
    requests.put<Activity, void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete<void>(`/activities/${id}`),
};

const services = {
  Activities,
};

export default services;
