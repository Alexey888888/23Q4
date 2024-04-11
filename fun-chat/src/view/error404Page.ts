import BaseComponent from '../components/baseComponent';

export default class Error404Page {
  // eslint-disable-next-line class-methods-use-this
  render() {
    const page404 = new BaseComponent({ tag: 'h1', text: '404 Page not found' });
    document.body.append(page404.getNode());
    return page404;
  }
}
