import Node from './classNode.js';
import imageTemplates from './imageTemplates.json' assert { type: 'json' };

const { body } = document;

body.innerHTML = ''; // ------REMOVE

const header = new Node({
  tagName: 'header',
  classNames: ['header'],
  parentNode: body,
});
const background = new Node({
  tagName: 'img',
  classNames: ['main-background'],
  parentNode: header.node,
});
background.node.src = './src/img/png/nonograms.png';
const main = new Node({
  tagName: 'main',
  classNames: ['main'],
  parentNode: body,
});
const gameBox = new Node({ classNames: ['game-box'], parentNode: main.node });
const gameBoxWrapper = new Node({
  classNames: ['game-box__wrapper'],
  parentNode: gameBox.node,
});
const toolsUp = new Node({
  classNames: ['tools-up'],
  parentNode: gameBoxWrapper.node,
});
const toolsUpWrapper = new Node({
  className: ['tools-up__wrapper'],
  parentNode: toolsUp.node,
});
const gameBoard = new Node({
  classNames: ['game-board'],
  parentNode: gameBoxWrapper.node,
});
const field = new Node({
  classNames: ['field'],
  parentNode: gameBoard.node,
});
const toolsDown = new Node({
  classNames: ['tools-down'],
  parentNode: gameBoxWrapper.node,
});
const toolsDownWrapper = new Node({
  className: ['tools-down__wrapper'],
  parentNode: toolsDown.node,
});

function fillField(templateArr) {
  templateArr.forEach((templateRow) => {
    const row = new Node({ classNames: ['field__row'] });
    field.addNode(row);
    templateRow.forEach((templateCell) => {
      const cell = new Node({ classNames: ['field__cell'] });
      row.addNode(cell);
      if (templateCell) cell.addClass('black');
    });
  });
}

fillField(imageTemplates[1].imageArr);
