import { makeAutoObservable } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
  serverError: ServerError | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setServerError(serverError: ServerError) {
    this.serverError = serverError;
  }
}
