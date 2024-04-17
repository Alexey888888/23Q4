import './dialogBox.scss';

import BaseComponent from '../baseComponent';

export default class DialogBox extends BaseComponent {
  constructor() {
    super({ classNames: ['dialog-box'] });
    this.append(new BaseComponent({ classNames: ['dialog-box__wrapper'] }));
  }
}
