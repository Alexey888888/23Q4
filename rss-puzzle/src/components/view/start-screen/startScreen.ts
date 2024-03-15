import './startScreenStyles.scss';

import BaseComponent from '../../baseComponent';
import startScreenDescription from './textContent';
import Button from '../../button/button';
import { userName, userSurname } from '../../../services/local-storage.service';
import app from '../../app/app';

export default class StartScreen extends BaseComponent {
  startScreen: BaseComponent;

  buttonLogOut: Button;

  constructor() {
    super({ classNames: ['start-screen'] });
    this.buttonLogOut = new Button({
      classNames: ['button'],
      text: 'Logout',
      onClick: () => {
        userName.clearData();
        userSurname.clearData();
        this.destroy();
        app.start();
      },
    });
    this.startScreen = new BaseComponent(
      { classNames: ['start-screen'] },
      new BaseComponent(
        { classNames: ['content'] },
        new BaseComponent({ classNames: ['title'], text: 'RSS PUZZLE' }),
        new BaseComponent({
          classNames: ['description'],
          text: startScreenDescription,
        }),
        new BaseComponent({ classNames: ['button-wrapper'] }, this.buttonLogOut),
      ),
    );
    this.append(this.startScreen);
  }
}
