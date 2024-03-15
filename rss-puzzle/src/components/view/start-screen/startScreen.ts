import './startScreenStyles.scss';

import BaseComponent from '../../baseComponent';
import startScreenDescription from './textContent';

class StartScreen extends BaseComponent {
  startScreen: BaseComponent;

  constructor() {
    super({ classNames: ['start-screen'] });
    this.startScreen = new BaseComponent(
      { classNames: ['start-screen'] },
      new BaseComponent(
        { classNames: ['content'] },
        new BaseComponent({ classNames: ['title'], text: 'RSS PUZZLE' }),
        new BaseComponent({
          classNames: ['description'],
          text: startScreenDescription,
        }),
      ),
    );
    this.append(this.startScreen);
  }
}

const startScreen = new StartScreen();
export default startScreen;
