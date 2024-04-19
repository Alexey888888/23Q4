import './dialogBox.scss';

import BaseComponent from '../baseComponent';
import { WebSocketUtil, webSocket } from '../../utils/webSocket';

export default class DialogBox extends BaseComponent {
  socket: WebSocketUtil;

  header: BaseComponent;

  talker: BaseComponent;

  talkerStatus: BaseComponent;

  constructor() {
    super({ classNames: ['dialog-box'] });
    this.socket = webSocket;
    this.talker = new BaseComponent({ tag: 'p' });
    this.talkerStatus = new BaseComponent({ tag: 'p', classNames: ['talker-status'] });
    this.header = new BaseComponent(
      { classNames: ['header'] },
      new BaseComponent({ classNames: ['header__inner'] }, this.talker, this.talkerStatus),
    );
    this.append(new BaseComponent({ classNames: ['dialog-box__wrapper'] }, this.header));
    document.addEventListener('userNodeClicked', (event) => {
      if (event instanceof CustomEvent) {
        const { username } = event.detail;
        this.updateTalker(username);
        const { userStatus } = event.detail;
        this.updateTalkerStatus(userStatus);
      }
    });
    document.addEventListener('talkerChangeStatus', (event) => {
      if (event instanceof CustomEvent) {
        if (event.detail.login === this.talker.getNode().textContent) {
          const currentTalkerStatus = event.detail.isLogined;
          this.updateTalkerStatus(currentTalkerStatus);
        }
      }
    });
  }

  updateTalker(username: string) {
    this.talker.setTextContent(username);
  }

  updateTalkerStatus(userStatus: boolean) {
    if (this.talker.getNode().textContent?.length && userStatus) {
      this.talkerStatus.setTextContent('online');
      this.talkerStatus.removeClass('talker-status_inactive');
    } else if (this.talker.getNode().textContent?.length) {
      this.talkerStatus.setTextContent('offline');
      this.talkerStatus.addClass(['talker-status_inactive']);
    }
  }
}
