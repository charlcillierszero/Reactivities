import {
  User,
  UserLoginFormValues,
  UserRegisterFormValues,
} from "../models/user";
import requests from "./baseService";

const AccountService = {
  current: () => requests.get<User>("/account"),
  login: (userLogin: UserLoginFormValues) =>
    requests.post<UserLoginFormValues, User>("/account/login", userLogin),
  register: (userRegister: UserRegisterFormValues) =>
    requests.post<UserRegisterFormValues, User>(
      "/account/register",
      userRegister
    ),
};

export default AccountService;
