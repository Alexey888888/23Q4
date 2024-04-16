import BaseComponent from '../components/baseComponent';
import Header from '../components/header/header';
import RouterInterface from '../types/types';

export default class MainPage {
  router: RouterInterface;

  header: Header;

  mainPage: BaseComponent;

  constructor(router: RouterInterface) {
    this.router = router;
    this.mainPage = new BaseComponent({ classNames: ['main-paige'] });
    this.header = new Header(this.router);
  }

  public render(): BaseComponent {
    this.mainPage.append(this.header);
    document.body.append(this.mainPage.getNode());
    return this.mainPage;
  }
}
