import './userList.scss';

import BaseComponent from '../baseComponent';

export default class UserList extends BaseComponent {
  constructor() {
    super({ classNames: ['user-list'] });
    this.append(new BaseComponent({ classNames: ['user-list__wrapper'] }));
  }
}
