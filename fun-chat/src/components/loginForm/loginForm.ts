import './loginForm.scss';

import BaseComponent from '../baseComponent';
import Button from '../button/button';
import Input from '../input/input';
import Form from '../form/form';
import RouterInterface, { Paths, UserData } from '../../types/types';
import { WebSocketUtil, webSocket } from '../../utils/webSocket';
import ModalWindow from '../modalWindow/modalWindow';
import InfoButton from '../infoButton/infoButton';

export default class LoginForm extends BaseComponent {
  usernameInput: Input;

  passwordInput: Input;

  loginButton: Button;

  infoButton: InfoButton;

  loginForm: BaseComponent;

  usernameErrorMessage: BaseComponent;

  passwordLengthErrorMessage: BaseComponent;

  passwordCaseErrorMessage: BaseComponent;

  router: RouterInterface;

  socket: WebSocketUtil;

  static ValidationErrors = {
    LengthError: 'Length must be more than 4 characters',
    letterCaseError: 'Use uppercase and capital letters',
  };

  constructor(router: RouterInterface) {
    super({ classNames: ['login-window'] });
    this.socket = webSocket;
    this.router = router;
    this.usernameInput = new Input({ name: 'input-nickname', placeholder: 'Input username' });
    this.passwordInput = new Input({ name: 'input-password', type: 'password', placeholder: 'Input password' });
    this.loginButton = new Button({
      text: 'LOGIN',
      attribute: 'type',
      value: 'submit',
      disabled: true,
      classNames: ['button', 'button_disabled'],
    });
    this.infoButton = new InfoButton(this.router);
    this.loginForm = new Form({
      classNames: ['form'],
      onSubmit: (event) => this.formOnsubmit(event),
    });
    this.usernameErrorMessage = new BaseComponent({ tag: 'span' });
    this.passwordLengthErrorMessage = new BaseComponent({ tag: 'span' });
    this.passwordCaseErrorMessage = new BaseComponent({ tag: 'span' });
    this.initForm();
    this.addInputListener();
  }

  private initForm(): void {
    this.loginForm.appendChildren([
      new BaseComponent(
        { tag: 'fieldset' },
        new BaseComponent({ tag: 'legend', text: 'Authentication' }),
        new BaseComponent(
          { tag: 'label' },
          new BaseComponent({ tag: 'span', text: 'Username' }),
          new BaseComponent({ classNames: ['input-area'] }, this.usernameInput, this.usernameErrorMessage),
        ),
        new BaseComponent(
          { tag: 'label' },
          new BaseComponent({ tag: 'span', text: 'Password' }),
          new BaseComponent(
            { classNames: ['input-area'] },
            this.passwordInput,
            this.passwordLengthErrorMessage,
            this.passwordCaseErrorMessage,
          ),
        ),
      ),
      this.loginButton,
      this.infoButton,
    ]);
    this.append(this.loginForm);
  }

  private addInputListener(): void {
    this.usernameInput.addListener('input', () => this.validateInput('username'));
    this.passwordInput.addListener('input', () => this.validateInput('password'));
  }

  private validateInput(flag: string) {
    function checkLength(str: string, textError: BaseComponent) {
      const minLength = 5;
      if (str.length < minLength) {
        textError.setTextContent(LoginForm.ValidationErrors.LengthError);
      } else textError.setTextContent('');
    }

    if (flag === 'username') {
      const userName = this.usernameInput.getNode().value;
      checkLength(userName, this.usernameErrorMessage);
    }

    if (flag === 'password') {
      const password = this.passwordInput.getNode().value;
      checkLength(password, this.passwordLengthErrorMessage);

      if (password === password.toLocaleLowerCase() || password === password.toLocaleUpperCase()) {
        this.passwordCaseErrorMessage.setTextContent(LoginForm.ValidationErrors.letterCaseError);
      } else this.passwordCaseErrorMessage.setTextContent('');
    }

    if (
      this.usernameInput.getNode().value &&
      this.passwordInput.getNode().value &&
      !this.usernameErrorMessage.getNode().textContent?.length &&
      !this.passwordLengthErrorMessage.getNode().textContent?.length &&
      !this.passwordCaseErrorMessage.getNode().textContent?.length
    ) {
      this.loginButtonSetDisabled(false);
    } else this.loginButtonSetDisabled(true);
  }

  private loginButtonSetDisabled(isError: boolean) {
    if (!isError) {
      this.loginButton.setDisabled(false);
      this.loginButton.removeClass('button_disabled');
    } else {
      this.loginButton.setDisabled(true);
      this.loginButton.addClass(['button_disabled']);
    }
  }

  private formOnsubmit(event: Event) {
    const login = this.usernameInput.getNode().value;
    const password = this.passwordInput.getNode().value;
    event.preventDefault();
    const request = {
      id: crypto.randomUUID(),
      type: 'USER_LOGIN',
      payload: {
        user: {
          login,
          password,
        },
      },
    };
    this.socket.send(request);
    this.checkMessageFromServer();
  }

  private checkMessageFromServer() {
    this.socket.onMessage((message: UserData) => {
      if (message.type === 'USER_LOGIN') {
        sessionStorage.setItem('funChatUser', this.usernameInput.getNode().value);
        sessionStorage.setItem('funChatUserPassword', this.passwordInput.getNode().value);
        this.router.routeTo(Paths.main);
      }
      if (message.payload && message.payload.error) {
        const modalWindow = new ModalWindow().init(message.payload.error);
        document.body.append(modalWindow.getNode());
      }
    });
  }
}
