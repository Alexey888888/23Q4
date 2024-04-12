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
