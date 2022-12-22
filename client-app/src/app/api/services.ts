import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { NOT_FOUND, SERVER_ERROR } from "../router/paths";
import { store } from "../stores/store";

axios.defaults.baseURL = "http://localhost:5000/api";

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

axios.interceptors.response.use(
  (response) => sleep(1000).then(() => response),
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id"))
          router.navigate(`/${`${NOT_FOUND}`}`);
        if (data.errors) {
          const modalStateErrors = [];
          for (let key in data.errors)
            if (data.errors[key]) modalStateErrors.push(data.errors[key]);
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("Unauthorised");
        break;
      case 403:
        toast.error("Forbidden");
        break;
      case 404:
        router.navigate(`/${`${NOT_FOUND}`}`);
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate(`/${`${SERVER_ERROR}`}`);
        break;
    }
    return Promise.reject(error);
  }
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
