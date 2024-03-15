import './loginFormStyles.scss';

import BaseComponent from '../../baseComponent';
import Input from '../../input/input';
import Form from '../../form/form';
import InputValidator from '../../../utils/validateLoginForm';
import Button from '../../button/button';
import { userName, userSurname } from '../../../services/local-storage.service';
import StartScreen from '../start-screen/startScreen';

interface FormValidationResult {
  isNotEmptyName: boolean;
  isNotEmptySurname: boolean;
  isEnglishAbcName: boolean;
  isEnglishAbcSurname: boolean;
  isFirstLetterUppercaseName: boolean;
  isFirstLetterUppercaseSurname: boolean;
  isMinimumLengthName: boolean;
  isMinimumLengthSurname: boolean;
}

export default class LoginForm extends BaseComponent {
  inputName: Input;

  inputSurname: Input;

  form: BaseComponent;

  inputButton: Button;

  nameErrorMessage: BaseComponent;

  surnameErrorMessage: BaseComponent;

  static ValidationErrors = {
    EmptyError: 'This field is required',
    NotEnglishError: 'English alphabet letters and hyphen symbol are allowed',
    TooShortTextError: 'This text is too short',
    FirstLetterUppercaseError: 'First letter should be uppercase',
  };

  constructor() {
    super({ classNames: ['login-window'] });
    this.inputName = new Input({ classNames: ['input-name'], name: 'name' });
    this.inputSurname = new Input({ classNames: ['input-surname'], name: 'surname' });
    this.nameErrorMessage = new BaseComponent({
      tag: 'span',
      classNames: ['error-message'],
      text: LoginForm.ValidationErrors.EmptyError,
    });
    this.surnameErrorMessage = new BaseComponent({
      tag: 'span',
      classNames: ['error-message'],
      text: LoginForm.ValidationErrors.EmptyError,
    });
    this.inputButton = new Button({
      classNames: ['button', 'button_disabled'],
      text: 'Login',
      attribute: 'type',
      value: 'submit',
      disabled: true,
    });
    this.form = new Form(
      { classNames: ['form'], onSubmit: this.onSubmit.bind(this) },
      new BaseComponent(
        { tag: 'label', classNames: ['label'] },
        new BaseComponent({ tag: 'span', text: 'First name' }),
        this.inputName,
        this.nameErrorMessage,
      ),
      new BaseComponent(
        { tag: 'label', classNames: ['label'] },
        new BaseComponent({ tag: 'span', text: 'Surname' }),
        this.inputSurname,
        this.surnameErrorMessage,
      ),
      this.inputButton,
    );
    this.append(this.form);
    this.inputName.addListener('input', () => this.checkInput());
    this.inputSurname.addListener('input', () => this.checkInput());
  }

  private onSubmit(event: Event): void {
    event.preventDefault();
    userName.saveData(this.inputName.getNode().value);
    userSurname.saveData(this.inputSurname.getNode().value);
    this.destroy();
    document.body.append(new StartScreen().getNode());
  }

  private validateForm(): FormValidationResult {
    const name = this.inputName.getNode().value;
    const surname = this.inputSurname.getNode().value;
    const isNotEmptyName = InputValidator.isNotEmptyString(name);
    const isNotEmptySurname = InputValidator.isNotEmptyString(surname);
    const isEnglishAbcName = InputValidator.isEnglishAbc(name);
    const isEnglishAbcSurname = InputValidator.isEnglishAbc(surname);
    const isFirstLetterUppercaseName = InputValidator.isFirstLetterUppercase(name);
    const isFirstLetterUppercaseSurname = InputValidator.isFirstLetterUppercase(surname);
    const isMinimumLengthName = name.length >= 3;
    const isMinimumLengthSurname = surname.length >= 4;

    return {
      isNotEmptyName,
      isNotEmptySurname,
      isEnglishAbcName,
      isEnglishAbcSurname,
      isFirstLetterUppercaseName,
      isFirstLetterUppercaseSurname,
      isMinimumLengthName,
      isMinimumLengthSurname,
    };
  }

  private checkInput() {
    const formValidationResult = this.validateForm();
    let nameErrorMessage = '';
    let surnameErrorMessage = '';

    if (!formValidationResult.isNotEmptyName) {
      nameErrorMessage = LoginForm.ValidationErrors.EmptyError;
    } else if (!formValidationResult.isEnglishAbcName) {
      nameErrorMessage = LoginForm.ValidationErrors.NotEnglishError;
    } else if (!formValidationResult.isFirstLetterUppercaseName) {
      nameErrorMessage = LoginForm.ValidationErrors.FirstLetterUppercaseError;
    } else if (!formValidationResult.isMinimumLengthName) {
      nameErrorMessage = LoginForm.ValidationErrors.TooShortTextError;
    }
    this.nameErrorMessage.setTextContent(nameErrorMessage);

    if (!formValidationResult.isNotEmptySurname) {
      surnameErrorMessage = LoginForm.ValidationErrors.EmptyError;
    } else if (!formValidationResult.isEnglishAbcSurname) {
      surnameErrorMessage = LoginForm.ValidationErrors.NotEnglishError;
    } else if (!formValidationResult.isFirstLetterUppercaseSurname) {
      surnameErrorMessage = LoginForm.ValidationErrors.FirstLetterUppercaseError;
    } else if (!formValidationResult.isMinimumLengthSurname) {
      surnameErrorMessage = LoginForm.ValidationErrors.TooShortTextError;
    }
    this.surnameErrorMessage.setTextContent(surnameErrorMessage);

    if (Object.values(formValidationResult).every((value) => value)) {
      this.inputButton.setDisabled(false);
      this.inputButton.removeClass('button_disabled');
    } else {
      this.inputButton.setDisabled(true);
      this.inputButton.addClass(['button_disabled']);
    }
  }
}
