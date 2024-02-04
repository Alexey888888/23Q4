class Node {
  constructor({
    tagName = 'div',
    classNames = [],
    texContent = '',
    parentNode,
  }) {
    this.node = document.createElement(tagName);
    this.node.classList.add(...classNames);
    this.node.textContent = texContent;
    if (parentNode) parentNode.append(this.node);
  }
  addNode(childrenNode) {
    this.node.append(childrenNode.node);
  }
  addClass(className) {
    this.node.classList.add(className);
  }
  removeClass(className) {
    this.node.classList.remove(className);
  }
  addText(text) {
    this.node.textContent = text;
  }
}

export default Node;
