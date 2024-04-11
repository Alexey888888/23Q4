import BaseComponent from '../components/baseComponent';

export default class MainPage {
  // eslint-disable-next-line class-methods-use-this
  render(): BaseComponent {
    const mainPage = new BaseComponent({ tag: 'h1', text: 'Main Page' });
    document.body.append(mainPage.getNode());
    return mainPage;
  }
}
