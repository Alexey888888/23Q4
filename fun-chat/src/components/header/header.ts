import './header.scss';

import RouterInterface from '../../types/types';
import BaseComponent from '../baseComponent';
import Button from '../button/button';
import InfoButton from '../infoButton/infoButton';

export default class Header extends BaseComponent {
  container: BaseComponent;

  userName: BaseComponent;

  infoButton: InfoButton;

  logoutButton: Button;

  router: RouterInterface;

  funChatUser: string | null;

  constructor(router: RouterInterface) {
    super({ classNames: ['header'] });
    this.router = router;
    this.funChatUser = null;
    if (sessionStorage.getItem('funChatUser')) this.funChatUser = sessionStorage.getItem('funChatUser');
    this.userName = new BaseComponent({ classNames: ['header__username'], text: `User: ${this.funChatUser}` });
    this.infoButton = new InfoButton(this.router);
    this.logoutButton = new Button({ text: 'LOGOUT' });
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
}
