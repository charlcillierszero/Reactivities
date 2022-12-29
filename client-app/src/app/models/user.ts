export interface User {
  username: string;
  displayName: string;
  token: string;
  image?: string;
}

export interface UserLoginFormValues {
  email: string;
  password: string;
}

export interface UserRegisterFormValues {
  email: string;
  password: string;
  displayName: string;
  username: string;
}
