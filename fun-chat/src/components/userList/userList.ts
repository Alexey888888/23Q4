import './userList.scss';

import BaseComponent from '../baseComponent';
import { WebSocketUtil, webSocket } from '../../utils/webSocket';
import { UserObj, UserData, UserStatus } from '../../types/types';
import Input from '../input/input';

export default class UserList extends BaseComponent {
  socket: WebSocketUtil;

  list: BaseComponent;

  searchForm: Input;

  constructor() {
    super({ classNames: ['user-list'] });
    this.socket = webSocket;
    this.list = new BaseComponent({ tag: 'ul', classNames: ['list'] });
    this.searchForm = new Input({ name: 'search', placeholder: 'Search...' });
    this.append(new BaseComponent({ classNames: ['user-list__wrapper'] }, this.searchForm, this.list));
    this.addMessageListener();
    this.displayUsers();
    this.addInputListener();
  }

  private async displayUsers() {
    await this.socket.connect();
    this.getUsers(UserStatus.active);
    this.getUsers(UserStatus.inactive);
  }

  private getUsers(status: UserStatus) {
    this.socket.getAllUsers(status);
    this.addMessageListener();
  }

  private addMessageListener() {
    this.socket.onMessage((message: UserData) => {
      if (message.payload && message.payload.users)
        Array.from(message.payload.users).forEach((user: UserObj) => {
          if (user.login !== sessionStorage.getItem('funChatUser')) {
            const userNode = new BaseComponent({ tag: 'li', classNames: ['user-item'], text: user.login });
            if (!user.isLogined) userNode.addClass(['inactive']);
            const eventData = {
              isLogined: user.isLogined,
              login: user.login,
            };
            const event = new CustomEvent('talkerChangeStatus', { detail: eventData });
            document.dispatchEvent(event);
            UserList.addUserClickListener(userNode, user.login);
            this.list.append(userNode);
          }
        });
      if (message.type === 'USER_EXTERNAL_LOGIN' || message.type === 'USER_EXTERNAL_LOGOUT') {
        this.list.destroyChildren();
        this.displayUsers();
      }
    });
  }

  private addInputListener() {
    this.searchForm.addListener('input', () => this.filterUsers());
  }

  private filterUsers() {
    Array.from(this.list.getNode().children).forEach((user) => {
      user.classList.remove('hidden');
    });
    Array.from(this.list.getNode().children).forEach((user) => {
      if (!user.textContent?.includes(this.searchForm.getNode().value)) {
        user.classList.add('hidden');
      }
    });
  }

  private static addUserClickListener(userNode: BaseComponent, username: string) {
    let userStatus = true;
    if (userNode.getNode().classList.contains('inactive')) userStatus = false;
    const eventData = {
      userStatus,
      username,
    };
    userNode.addListener('click', () => {
      const event = new CustomEvent('userNodeClicked', { detail: eventData });
      document.dispatchEvent(event);
    });
  }
}
