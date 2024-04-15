import BaseComponent from '../components/baseComponent';
import LoginForm from '../components/loginForm/loginForm';
import RouterInterface from '../types/types';

export default class LoginPage {
  router: RouterInterface;

  loginForm: BaseComponent;

  constructor(router: RouterInterface) {
    this.router = router;
    this.loginForm = new LoginForm(this.router);
  }

  public render(): BaseComponent {
    document.body.append(this.loginForm.getNode());
    return this.loginForm;
  }
}
