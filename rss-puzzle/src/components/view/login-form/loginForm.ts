import './loginFormStyles.scss';

import BaseComponent from '../../baseComponent';
import Input from '../../input/input';
import Form from '../../form/form';
import InputValidator from '../../../utils/validateLoginForm';
import Button from '../../button/button';

class LoginForm extends BaseComponent {
  inputName: Input;

  inputSurname: Input;

  form: BaseComponent;

  inputButton: Button;

  constructor() {
    super({ classNames: ['login-window'] });
    this.inputName = new Input({ classNames: ['input-name'], name: 'name' });
    this.inputSurname = new Input({ classNames: ['input-surname'], name: 'surname' });
    this.inputButton = new Button({
      classNames: ['button', 'button_disabled'],
      text: 'Login',
      attribute: 'type',
      value: 'submit',
      disabled: true,
    });
    this.form = new Form(
      {
        classNames: ['form'],
        onSubmit: (event: Event) => {
          event.preventDefault();
          console.log(this.inputName.getNode().value);
          console.log(this.inputSurname.getNode().value);
          this.validateForm();
        },
      },
      new BaseComponent(
        { tag: 'label', classNames: ['label'] },
        new BaseComponent({ tag: 'span', text: 'First name' }),
        this.inputName,
      ),
      new BaseComponent(
        { tag: 'label', classNames: ['label'] },
        new BaseComponent({ tag: 'span', text: 'Surname' }),
        this.inputSurname,
      ),
      this.inputButton,
    );

    this.append(this.form);
    this.inputName.addListener('input', () => this.checkInput());
    this.inputSurname.addListener('input', () => this.checkInput());
  }

  public validateForm(): boolean {
    const nameValid = InputValidator.validateName(this.inputName.getNode().value);
    const surnameValid = InputValidator.validateSurname(this.inputSurname.getNode().value);
    return nameValid && surnameValid;
  }

  public checkInput() {
    if (this.validateForm()) {
      this.inputButton.setDisabled(false);
      this.inputButton.removeClass('button_disabled');
    } else {
      this.inputButton.setDisabled(true);
      this.inputButton.addClass(['button_disabled']);
    }
  }
}

const loginForm = new LoginForm();
export default loginForm;
