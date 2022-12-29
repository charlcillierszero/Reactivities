import { makeAutoObservable } from "mobx";
import AccountService from "../api/accountService";
import {
  User,
  UserLoginFormValues,
  UserRegisterFormValues,
} from "../models/user";
import { ACTIVITIES, HOME } from "../router/paths";
import { router } from "../router/Routes";
import { store } from "./store";

class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  setUser = (user: User | null) => {
    this.user = user;
  };

  private handleUserLoggedIn = (user: User) => {
    store.commonStore.setToken(user.token);
    this.setUser(user);
    router.navigate(`/${ACTIVITIES}`);
    store.modalStore.closeModal();
  };

  login = async (userLogin: UserLoginFormValues) => {
    return AccountService.login(userLogin)
      .then(this.handleUserLoggedIn)
      .catch((error) => Promise.reject(error));
  };

  register = async (userRegister: UserRegisterFormValues) => {
    return AccountService.register(userRegister)
      .then(this.handleUserLoggedIn)
      .catch((error) => Promise.reject(error));
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.setUser(null);
    router.navigate(HOME);
  };

  getUser = async () => {
    return AccountService.current()
      .then((user) => this.setUser(user))
      .catch((error) => Promise.reject(error))
      .finally(() => {});
  };
}

export default UserStore;
