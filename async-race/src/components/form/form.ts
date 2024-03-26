import BaseComponent from '../baseComponent';

type FormProps = { classNames: string[]; onSubmit: (event: Event) => void };

export default class Form extends BaseComponent<HTMLFormElement> {
  constructor({ classNames, onSubmit }: FormProps, ...children: BaseComponent<HTMLElement>[]) {
    super({ tag: 'form', classNames });
    this.addListener('submit', onSubmit);
    this.appendChildren(children);
  }

  getNode(): HTMLFormElement {
    return this.node;
  }
}
