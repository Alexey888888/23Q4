import './mainSection.scss';

import BaseComponent from '../baseComponent';
import UserList from '../userList/userList';
import DialogBox from '../dialogBox/dialogBox';

export default class MainSection extends BaseComponent {
  container: BaseComponent;

  userList: UserList;

  dialogBox: DialogBox;

  constructor() {
    super({ classNames: ['main'] });
    this.dialogBox = new DialogBox();
    this.userList = new UserList();
    this.container = new BaseComponent(
      { classNames: ['container'] },
      new BaseComponent({ classNames: ['main__wrapper'] }, this.userList, this.dialogBox),
    );
    this.append(this.container);
  }
}
