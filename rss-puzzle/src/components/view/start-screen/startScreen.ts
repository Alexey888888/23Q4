import './startScreenStyles.scss';

import BaseComponent from '../../baseComponent';
import startScreenDescription from './textContent';
import Button from '../../button/button';
import { userName, userSurname } from '../../../services/localStorageService';
import app from '../../app/app';
import { game } from '../game/game';

export default class StartScreen extends BaseComponent {
  startScreen: BaseComponent;

  buttonLogOut: Button;

  buttonStart: Button;

  constructor() {
    super({ classNames: ['start-screen'] });
    this.buttonLogOut = new Button({
      text: 'Logout',
      onClick: () => {
        userName.clearData();
        userSurname.clearData();
        this.destroy();
        app.start();
      },
    });
    this.buttonStart = new Button({
      text: 'Start',
      onClick: () => {
        this.destroy();
        game.start();
      },
    });
    this.startScreen = new BaseComponent(
      { classNames: ['start-screen'] },
      new BaseComponent(
        { classNames: ['content'] },
        new BaseComponent({
          classNames: ['greeting'],
          text: `Welcome ${userName.getData()} ${userSurname.getData()}, enjoy the game!`,
        }),
        new BaseComponent({ classNames: ['title'], text: 'RSS PUZZLE' }),
        new BaseComponent({
          classNames: ['description'],
          text: startScreenDescription,
        }),
        new BaseComponent({ classNames: ['button-wrapper'] }, this.buttonLogOut, this.buttonStart),
      ),
    );
    this.append(this.startScreen);
  }
}
