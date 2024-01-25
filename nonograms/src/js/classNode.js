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
}

export default Node;
