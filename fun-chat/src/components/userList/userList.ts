import './userList.scss';

import BaseComponent from '../baseComponent';
import { WebSocketUtil, webSocket } from '../../utils/webSocket';
import { UserObj, UserData, UserStatus } from '../../types/types';

export default class UserList extends BaseComponent {
  socket: WebSocketUtil;

  list: BaseComponent;

  constructor() {
    super({ classNames: ['user-list'] });
    this.socket = webSocket;
    this.list = new BaseComponent({ tag: 'ul', classNames: ['list'] });
    this.append(new BaseComponent({ classNames: ['user-list__wrapper'] }, this.list));
    this.waitWebSocket();
  }

  private async waitWebSocket() {
    await this.socket.connect();
    this.getActiveUsers();
  }

  private getActiveUsers() {
    this.socket.getAllUsers(UserStatus.active);
    this.socket.onMessage((message: UserData) => {
      if (message.payload && message.payload.users)
        Array.from(message.payload.users).forEach((user: UserObj) => {
          if (user.login !== sessionStorage.getItem('funChatUser'))
            this.list.append(new BaseComponent({ tag: 'li', classNames: ['user-item'], text: user.login }));
        });
    });
  }
}
