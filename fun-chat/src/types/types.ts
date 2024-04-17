export default interface RouterInterface {
  routeTo(path: string): void;
}

export type UserAuthenticationData = {
  id: string;
  type: string;
  payload: {
    error?: string;
    user: {
      login: string;
      password: string;
    };
  };
};

export enum Paths {
  login = '/login',
  main = '/main',
  about = '/about',
  slash = '/',
}

export enum UserAction {
  USER_LOGOUT = 'USER_LOGOUT',
  USER_LOGIN = 'USER_LOGIN',
}
