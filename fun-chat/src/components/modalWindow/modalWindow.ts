import './modalWindow.scss';

import BaseComponent from '../baseComponent';
import Button from '../button/button';
import BlackOut from '../blackOut/blackOut';

export default class ModalWindow extends BaseComponent {
  message: string | null;

  button: Button;

  blackOut: BlackOut;

  constructor() {
    super({ classNames: ['modal-window'] });
    this.message = null;
    this.blackOut = new BlackOut();
    this.button = new Button({
      text: 'Ok',
      onClick: () => {
        this.blackOut.destroy();
        this.destroy();
      },
    });
  }

  public init(message: string): ModalWindow {
    this.message = message;
    this.appendChildren([new BaseComponent({ text: this.message }), this.button]);
    document.body.append(this.blackOut.getNode());
    return this;
  }
}
