import { AxiosResponse } from "axios";

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const sleepInterceptor = (response: AxiosResponse<any, any>) =>
  sleep(1000).then(() => response);

export default sleepInterceptor;
