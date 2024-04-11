import BaseComponent from '../components/baseComponent';

export default class AboutPage {
  // eslint-disable-next-line class-methods-use-this
  render(): BaseComponent {
    const aboutPage = new BaseComponent({ tag: 'h1', text: 'About Page' });
    document.body.append(aboutPage.getNode());
    return aboutPage;
  }
}
