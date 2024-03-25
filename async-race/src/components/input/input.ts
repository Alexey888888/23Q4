import './input.scss';

import BaseComponent from '../baseComponent';

type InputProps = {
  classNames?: string[];
  name: string;
  type?: string;
};

export default class Input extends BaseComponent<HTMLInputElement> {
  constructor({ name, type = 'text' }: InputProps) {
    super({ tag: 'input', classNames: ['input'] });
    this.setAttribute('name', name);
    this.setAttribute('type', type);
  }

  getNode(): HTMLInputElement {
    return this.node;
  }
}
