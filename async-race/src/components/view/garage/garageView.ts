import './garage.scss';

import BaseComponent from '../../baseComponent';

export default class GarageView extends BaseComponent {
  container: BaseComponent;

  constructor() {
    super({ classNames: ['garage'] });
    this.container = new BaseComponent(
      { classNames: ['container'] },
      new BaseComponent({ classNames: ['temp'], text: 'Garage' }),
    );
    this.append(this.container);
  }
}
