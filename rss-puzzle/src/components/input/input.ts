import './inputStyles.scss';

import BaseComponent from '../baseComponent';

type InputProps = {
  classNames: string[];
  name: string;
  type?: string;
};

export default class Input extends BaseComponent<HTMLInputElement> {
  protected node: HTMLInputElement;

  constructor({ name, type = 'text' }: InputProps) {
    super({ tag: 'input', classNames: ['input'] });
    this.node = this.getNode();
    this.setAttribute('name', name);
    this.setAttribute('type', type);
  }

  public getNode(): HTMLInputElement {
    return this.node;
  }
}
