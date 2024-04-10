import './loginForm.scss';

import BaseComponent from '../baseComponent';
import Button from '../button/button';
import Input from '../input/input';

export default class LoginForm extends BaseComponent {
  usernameInput: Input;

  passwordInput: Input;

  loginButton: Button;

  infoButton: Button;

  loginForm: BaseComponent;

  usernameErrorMessage: BaseComponent;

  passwordErrorMessage: BaseComponent;

  static ValidationErrors = {
    EmptyError: 'This field is required',
    NotEnglishError: 'English alphabet letters and hyphen symbol are allowed',
    TooShortTextError: 'This text is too short',
    FirstLetterUppercaseError: 'First letter should be uppercase',
  };

  constructor() {
    super({ classNames: ['login-window'] });
    this.usernameInput = new Input({ name: 'input-nickname' });
    this.passwordInput = new Input({ name: 'input-password', type: 'password' });
    this.loginButton = new Button({ text: 'LOGIN', disabled: true, classNames: ['button', 'button_disabled'] });
    this.infoButton = new Button({ text: 'Info' });
    this.loginForm = new BaseComponent({ tag: 'form' });
    this.usernameErrorMessage = new BaseComponent({ tag: 'span' });
    this.passwordErrorMessage = new BaseComponent({ tag: 'span' });

    this.initForm();
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
          new BaseComponent({ classNames: ['input-area'] }, this.passwordInput, this.passwordErrorMessage),
        ),
      ),
      this.loginButton,
      this.infoButton,
    ]);
    this.append(this.loginForm);
  }
}
