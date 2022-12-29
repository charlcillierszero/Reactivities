import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { NOT_FOUND, SERVER_ERROR } from "../../router/paths";
import { router } from "../../router/Routes";
import { store } from "../../stores/store";

const httpErrorCodeInterceptor = (error: AxiosError) => {
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
      } else toast.error(data);
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
};

export default httpErrorCodeInterceptor;
