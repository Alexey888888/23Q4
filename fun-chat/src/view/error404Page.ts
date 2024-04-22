import BaseComponent from '../components/baseComponent';

export default class Error404Page {
  inner: BaseComponent;

  constructor() {
    this.inner = new BaseComponent({ tag: 'h1', text: '404 Page not found' });
  }

  render() {
    const page404 = new BaseComponent({}, this.inner);
    document.body.append(page404.getNode());
    return page404;
  }
}
