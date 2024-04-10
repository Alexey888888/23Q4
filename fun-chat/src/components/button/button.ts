import './button.scss';

import BaseComponent from '../baseComponent';

type ButtonProps = {
  text: string;
  classNames?: string[];
  attribute?: string;
  value?: string;
  disabled?: boolean;
  onClick?: (event: Event) => void;
};

export default class Button extends BaseComponent<HTMLButtonElement> {
  constructor({ classNames = ['button'], text, attribute, value, disabled = false, onClick }: ButtonProps) {
    super({ tag: 'button', text, classNames, attribute, value });
    if (disabled) this.setDisabled(disabled);
    if (onClick) this.addListener('click', onClick);
  }

  getNode(): HTMLButtonElement {
    return this.node;
  }

  public setDisabled(disabled: boolean): void {
    this.node.disabled = disabled;
  }
}
