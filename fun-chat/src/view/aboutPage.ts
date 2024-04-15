import './aboutPage.scss';

import BaseComponent from '../components/baseComponent';
import Button from '../components/button/button';

export default class AboutPage {
  button: Button;

  constructor() {
    this.button = new Button({ text: 'GO BACK', onClick: () => window.history.back() });
  }

  public render(): BaseComponent {
    const aboutPage = new BaseComponent(
      { classNames: ['info-window'] },
      new BaseComponent({ tag: 'h3', classNames: ['title'], text: 'FUN CHAT' }),
      new BaseComponent({
        tag: 'p',
        classNames: ['app-description'],
        text: 'The application is designed to demonstrate the Fun Chat assignment in the RSSchool JS/FE 2023Q3 course',
      }),
      new BaseComponent({
        tag: 'a',
        classNames: ['author-link'],
        text: 'Author: Alexey Borodako',
        attribute: 'href',
        value: 'https://github.com/Alexey888888',
      }),
      this.button,
    );

    document.body.append(aboutPage.getNode());
    return aboutPage;
  }
}
