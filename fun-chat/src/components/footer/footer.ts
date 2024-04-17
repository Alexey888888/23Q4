import './footer.scss';

import BaseComponent from '../baseComponent';

export default class Footer extends BaseComponent {
  container: BaseComponent;

  schoolLogo: BaseComponent;

  author: BaseComponent;

  constructor() {
    super({ classNames: ['footer'] });
    this.schoolLogo = new BaseComponent(
      { tag: 'a', classNames: ['rs-school'], attribute: 'href', value: 'https://rs.school/' },
      new BaseComponent({ tag: 'img', attribute: 'src', value: './rs_school_js.svg' }),
    );
    this.author = new BaseComponent(
      {
        classNames: ['author'],
      },
      new BaseComponent({
        tag: 'a',
        attribute: 'href',
        value: 'https://github.com/Alexey888888',
        text: 'Alexey Borodako',
      }),
    );
    this.container = new BaseComponent(
      { classNames: ['container'] },
      new BaseComponent(
        { classNames: ['footer__wrapper'] },
        this.schoolLogo,
        this.author,
        new BaseComponent({ tag: 'p', text: '2024' }),
      ),
    );
    this.init();
  }

  private init() {
    this.append(this.container);
  }
}
