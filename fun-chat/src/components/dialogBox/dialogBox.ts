import './dialogBox.scss';

import BaseComponent from '../baseComponent';
import { WebSocketUtil, webSocket } from '../../utils/webSocket';
import Input from '../input/input';
import Button from '../button/button';

export default class DialogBox extends BaseComponent {
  socket: WebSocketUtil;

  header: BaseComponent;

  talker: BaseComponent;

  talkerStatus: BaseComponent;

  dialogField: BaseComponent;

  sendString: BaseComponent;

  sendInput: Input;

  sendButton: Button;

  constructor() {
    super({ classNames: ['dialog-box'] });
    this.socket = webSocket;
    this.talker = new BaseComponent({ tag: 'p' });
    this.talkerStatus = new BaseComponent({ tag: 'p', classNames: ['talker-status'] });
    this.header = new BaseComponent(
      { classNames: ['header'] },
      new BaseComponent({ classNames: ['header__inner'] }, this.talker, this.talkerStatus),
    );
    this.dialogField = new BaseComponent({ classNames: ['dialog-field'] });
    this.sendInput = new Input({ name: 'send-input', placeholder: 'Message...', disabled: true });
    this.sendButton = new Button({ text: 'Send', classNames: ['button', 'button_disabled'], disabled: true });
    this.sendString = new BaseComponent(
      { classNames: ['send-string'] },
      new BaseComponent({ classNames: ['send-string__wrapper'] }, this.sendInput, this.sendButton),
    );
    this.append(
      new BaseComponent({ classNames: ['dialog-box__wrapper'] }, this.header, this.dialogField, this.sendString),
    );
    this.setDialogFieldPlaceholder();
    this.addUserNodeClickListener();
    this.addChangeTalkerStatusListener();
    this.isSendInputEmpty();
  }

  private setDialogFieldPlaceholder() {
    this.dialogField.destroyChildren();
    this.dialogField.append(
      new BaseComponent({
        classNames: ['dialog-field__placeholder'],
        text: 'Select the user to send the message to...',
      }),
    );
  }

  private addUserNodeClickListener() {
    document.addEventListener('userNodeClicked', (event) => {
      if (event instanceof CustomEvent) {
        const { username } = event.detail;
        this.updateTalker(username);
        const { userStatus } = event.detail;
        this.updateTalkerStatus(userStatus);
      }
      this.dialogField.destroyChildren();
      this.sendInput.setDisabled(false);
    });
  }

  private addChangeTalkerStatusListener() {
    document.addEventListener('talkerChangeStatus', (event) => {
      if (event instanceof CustomEvent) {
        if (event.detail.login === this.talker.getNode().textContent) {
          const currentTalkerStatus = event.detail.isLogined;
          this.updateTalkerStatus(currentTalkerStatus);
        }
      }
    });
  }

  private updateTalker(username: string) {
    this.talker.setTextContent(username);
  }

  private updateTalkerStatus(userStatus: boolean) {
    if (this.talker.getNode().textContent?.length && userStatus) {
      this.talkerStatus.setTextContent('online');
      this.talkerStatus.removeClass('talker-status_inactive');
    } else if (this.talker.getNode().textContent?.length) {
      this.talkerStatus.setTextContent('offline');
      this.talkerStatus.addClass(['talker-status_inactive']);
    }
  }

  private isSendInputEmpty() {
    this.sendInput.addListener('input', () => {
      if (this.sendInput.getNode().value.length) {
        this.sendButton.setDisabled(false);
        this.sendButton.removeClass('button-disabled');
      } else {
        this.sendButton.setDisabled(true);
        this.sendButton.addClass(['button-disabled']);
      }
    });
  }
}
