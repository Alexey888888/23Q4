import './formStyles.scss';
import BaseComponent from '../baseComponent';

type FormProps = { classNames: string[]; onSubmit: (event: Event) => void };

export default class Form extends BaseComponent<HTMLFormElement> {
  protected node: HTMLFormElement;

  constructor({ classNames, onSubmit }: FormProps, ...children: BaseComponent<HTMLElement>[]) {
    super({ tag: 'form', classNames });
    this.node = this.getNode();
    this.addListener('submit', onSubmit);
    this.appendChildren(children);
  }

  public getNode(): HTMLFormElement {
    return this.node;
  }
}
