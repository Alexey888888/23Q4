import BaseComponent from '../baseComponent';
import GarageView from '../view/garage/garageView';
import Header from '../view/header/header';
import WinnersView from '../view/winners/winnersView';

export default class App {
  private body: HTMLElement;

  private header: BaseComponent;

  private garage: BaseComponent;

  private winners: BaseComponent;

  constructor() {
    this.body = document.body;
    this.winners = new WinnersView();
    this.garage = new GarageView();
    this.header = new Header(this.winners, this.garage);
  }

  public start(): void {
    this.body.append(this.header.getNode());
    this.body.append(this.garage.getNode());
    this.body.append(this.winners.getNode());
  }
}
