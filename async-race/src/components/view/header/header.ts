import './header.scss';

import BaseComponent from '../../baseComponent';
import Button from '../../button/button';

export default class Header extends BaseComponent {
  container: BaseComponent;

  buttonGarage: Button;

  buttonWinners: Button;

  constructor(
    private winners: BaseComponent,
    private garage: BaseComponent,
  ) {
    super({ tag: 'header', classNames: ['header'] });
    this.buttonGarage = new Button({ text: 'TO GARAGE', onClick: () => this.showGarage() });
    this.buttonWinners = new Button({
      text: 'TO WINNER',
      onClick: () => this.showWinnersPage(),
    });
    this.container = new BaseComponent(
      { classNames: ['container'] },
      new BaseComponent({ classNames: ['header__buttons'] }, this.buttonGarage, this.buttonWinners),
    );
    this.append(this.container);
  }

  showWinnersPage() {
    this.garage.addClass(['page_hidden']);
    this.winners.removeClass('page_hidden');
  }

  showGarage() {
    this.winners.addClass(['page_hidden']);
    this.garage.removeClass('page_hidden');
  }
}
