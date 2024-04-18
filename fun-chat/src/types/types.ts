export default interface RouterInterface {
  routeTo(path: string): void;
}

export type UserObj = {
  login: string;
  isLogined: boolean;
};

export type UserData = {
  id: string;
  type: string;
  payload: {
    error?: string;
    users?: ArrayLike<UserObj>;
    user: {
      login: string;
      password: string;
    };
  } | null;
};

export enum Paths {
  login = '/login',
  main = '/main',
  about = '/about',
  slash = '/',
}

export enum UserAction {
  logout = 'USER_LOGOUT',
  login = 'USER_LOGIN',
}

export enum UserStatus {
  active = 'USER_ACTIVE',
  inactive = 'USER_INACTIVE',
}

export type AllUserDataResponse = {
  id: string;
  type: UserStatus;
  payload: {
    users: string[];
  };
};
