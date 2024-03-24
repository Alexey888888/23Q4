import './winners.scss';

import BaseComponent from '../../baseComponent';

export default class WinnersView extends BaseComponent {
  container: BaseComponent;

  innerTemp: BaseComponent;

  constructor() {
    super({ classNames: ['winners', 'page_hidden'] });
    this.innerTemp = new BaseComponent();
    this.container = new BaseComponent(
      { classNames: ['container'] },
      new BaseComponent({ classNames: ['temp'], text: ' Winners' }),
      this.innerTemp,
    );
    this.append(this.container);
  }
}
