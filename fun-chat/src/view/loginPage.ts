import LoginForm from '../components/loginForm/loginForm';

export default class LoginPage {
  // eslint-disable-next-line class-methods-use-this
  public render(): void {
    document.body.append(new LoginForm().getNode());
  }
}
