import BaseComponent from '../components/baseComponent';
import LoginForm from '../components/loginForm/loginForm';
import RouterInterface from '../types/types';

export default class LoginPage {
  router: RouterInterface;

  constructor(router: RouterInterface) {
    this.router = router;
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): BaseComponent {
    const loginPage = new LoginForm(this.router);
    document.body.append(loginPage.getNode());
    return loginPage;
  }
}
