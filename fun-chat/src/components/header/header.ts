import './header.scss';

import RouterInterface, { Paths, UserAction } from '../../types/types';
import BaseComponent from '../baseComponent';
import Button from '../button/button';
import InfoButton from '../infoButton/infoButton';
import { WebSocketUtil, webSocket } from '../../utils/webSocket';

export default class Header extends BaseComponent {
  container: BaseComponent;

  userName: BaseComponent;

  infoButton: InfoButton;

  logoutButton: Button;

  router: RouterInterface;

  funChatUser: string | null;

  socket: WebSocketUtil;

  constructor(router: RouterInterface) {
    super({ classNames: ['header'] });
    this.router = router;
    this.socket = webSocket;
    this.funChatUser = null;
    if (sessionStorage.getItem('funChatUser')) this.funChatUser = sessionStorage.getItem('funChatUser');
    this.userName = new BaseComponent({ classNames: ['header__username'], text: `User: ${this.funChatUser}` });
    this.infoButton = new InfoButton(this.router);
    this.logoutButton = new Button({ text: 'LOGOUT', onClick: () => this.logout() });
    this.container = new BaseComponent(
      { classNames: ['container'] },
      new BaseComponent(
        { classNames: ['header__wrapper'] },
        new BaseComponent(
          { classNames: ['name-wrapper'] },
          this.userName,
          new BaseComponent({ tag: 'p', text: 'FUN CHAT' }),
        ),
        new BaseComponent({ classNames: ['button-wrapper'] }, this.infoButton, this.logoutButton),
      ),
    );
    this.init();
  }

  private init() {
    this.append(this.container);
  }

  private logout() {
    this.socket.logInOutUser(UserAction.logout);
    sessionStorage.clear();
    this.router.routeTo(Paths.login);
  }
}
