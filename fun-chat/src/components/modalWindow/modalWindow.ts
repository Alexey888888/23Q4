import './modalWindow.scss';

import BaseComponent from '../baseComponent';
import Button from '../button/button';
import BlackOut from '../blackOut/blackOut';

export default class ModalWindow extends BaseComponent {
  message: string | null;

  button: Button;

  blackOut: BlackOut;

  intervalId: number | null;

  constructor() {
    super({ classNames: ['modal-window'] });
    this.message = null;
    this.intervalId = null;
    this.blackOut = new BlackOut();
    this.button = new Button({
      text: 'Ok',
      onClick: () => this.close(),
    });
  }

  public init(message: string): ModalWindow {
    this.message = message;
    this.appendChildren([
      new BaseComponent({ classNames: ['modal-window__message'], text: this.message }),
      this.button,
    ]);
    document.body.prepend(this.blackOut.getNode());
    return this;
  }

  public disconnect() {
    const windowTitle = 'Please wait';
    this.message = 'Server connection';
    const messageWrapper = new BaseComponent({ text: this.message });
    this.appendChildren([new BaseComponent({ text: windowTitle }), messageWrapper]);
    document.body.prepend(this.blackOut.getNode());
    this.intervalId = setInterval(() => messageWrapper.toggleClass('hidden'), 1000);
    return this;
  }

  public connect(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    this.close();
  }

  private close(): void {
    this.blackOut.destroy();
    this.destroy();
  }
}
