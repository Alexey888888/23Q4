import BaseComponent from '../baseComponent';

export class Game {
  placeholder: BaseComponent;

  constructor() {
    this.placeholder = new BaseComponent({ text: 'placeholder' });
  }

  start() {
    document.body.append(this.placeholder.getNode());
  }
}

export const game = new Game();
