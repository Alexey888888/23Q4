import './input.scss';

import BaseComponent from '../baseComponent';

type InputProps = {
  classNames?: string[];
  name: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
};

export default class Input extends BaseComponent<HTMLInputElement> {
  constructor({ name, type = 'text', disabled = false, placeholder }: InputProps) {
    super({ tag: 'input', classNames: ['input'] });
    this.setAttribute('name', name);
    this.setAttribute('type', type);
    if (placeholder) this.setAttribute('placeholder', placeholder);
    this.setAttribute('autocomplete', 'off');
    if (disabled) this.setDisabled(disabled);
  }

  getNode(): HTMLInputElement {
    return this.node;
  }

  public setDisabled(disabled: boolean): void {
    this.node.disabled = disabled;
  }
}
