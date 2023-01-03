import { AxiosResponse } from "axios";

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const sleepMillis = 0;
const sleepInterceptor = (response: AxiosResponse<any, any>) =>
  sleep(sleepMillis).then(() => response);

export default sleepInterceptor;
