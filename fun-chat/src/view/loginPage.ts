import BaseComponent from '../components/baseComponent';
import LoginForm from '../components/loginForm/loginForm';

export default class LoginPage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(router: any) {
    this.router = router;
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): BaseComponent {
    const loginPage = new LoginForm(this.router);
    document.body.append(loginPage.getNode());
    return loginPage;
  }
}
