import './mainPage.scss';

import BaseComponent from '../components/baseComponent';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import RouterInterface from '../types/types';

export default class MainPage {
  router: RouterInterface;

  header: Header;

  footer: Footer;

  mainPage: BaseComponent;

  constructor(router: RouterInterface) {
    this.router = router;
    this.mainPage = new BaseComponent({ classNames: ['main-page'] });
    this.header = new Header(this.router);
    this.footer = new Footer();
  }

  public render(): BaseComponent {
    this.mainPage.appendChildren([this.header, this.footer]);
    document.body.append(this.mainPage.getNode());
    return this.mainPage;
  }
}
