type BaseComponentProps = {
  tag?: keyof HTMLElementTagNameMap;
  classNames?: string[];
  text?: string;
  attribute?: string;
  value?: string;
};

export default class BaseComponent<T extends HTMLElement = HTMLElement> {
  // eslint-disable-next-line no-use-before-define
  private children: BaseComponent[] = [];

  protected node: T;

  constructor(
    { tag = 'div', classNames = [], text = '', attribute, value }: BaseComponentProps = {},
    ...children: BaseComponent[]
  ) {
    const node = document.createElement(tag) as T;

    node.textContent = text;
    this.node = node;
    if (classNames.length > 0) this.addClass(classNames);
    if (children) this.appendChildren(children);
    if (attribute && value) this.setAttribute(attribute, value);
  }

  public append(child: BaseComponent): void {
    this.children.push(child);
    this.node.append(child.getNode());
  }

  public getNode(): HTMLElement {
    return this.node;
  }

  public appendChildren(children: BaseComponent[]): void {
    children.forEach((el) => {
      this.append(el);
    });
  }

  public addClass(className: string[]): void {
    this.node.classList.add(...className);
  }

  public removeClass(className: string): void {
    this.node.classList.remove(className);
  }

  public toggleClass(className: string): void {
    this.node.classList.toggle(className);
  }

  public setTextContent(content: string): void {
    this.node.textContent = content;
  }

  public setAttribute(attribute: string, value: string): void {
    this.node.setAttribute(attribute, value);
  }

  public addListener(event: string, listener: EventListener): void {
    this.node.addEventListener(event, listener);
  }

  public removeListener(event: string, listener: EventListener): void {
    this.node.removeEventListener(event, listener);
  }

  public destroyChildren(): void {
    this.children.forEach((child) => {
      child.destroy();
    });
    this.children.length = 0;
  }

  public destroy(): void {
    this.destroyChildren();
    this.node.remove();
  }
}
