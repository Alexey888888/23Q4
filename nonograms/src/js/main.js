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

// ----------------------------------------------------------
let originalFullTemplateArr = null;
let currentFullTemplateArr = null;
let templateArr = null;

templateArr = imageTemplates[2].imageArr;
originalFullTemplateArr = copyArr(templateArr);

const hintsUpArr = Array.from({ length: templateArr[0].length }, () => []);
const hintsLeftArr = Array.from({ length: templateArr.length }, () => []);

function copyArr(arr) {
  return JSON.parse(JSON.stringify(arr));
}

function getMaxLengthArr(arr) {
  let maxLength = 0;
  let currentLength = 0;
  arr.forEach((el) => {
    if (Array.isArray(el)) currentLength = el.length;
    if (currentLength > maxLength) maxLength = currentLength;
  });
  return maxLength;
}

function addHints() {
  function getHintsUpArr(arr) {
    for (let j = 0; j < arr[0].length; j++) {
      let count = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][j]) {
          count++;
        } else {
          hintsUpArr[j].push(count);
          count = 0;
        }
      }
      hintsUpArr[j].push(count);
    }
    let resHintsUpArr = hintsUpArr.map((column) =>
      column.filter((number) => number),
    );
    //
    const maxLength = getMaxLengthArr(resHintsUpArr);
    resHintsUpArr.forEach((arr) => {
      if (arr.length !== maxLength) {
        arr.length = maxLength;
        for (let i = 0; i < arr.length; i++) {
          if (!arr[i]) arr[i] = 0;
        }
      }
      arr.reverse();
    });

    return resHintsUpArr;
  }

  function addHintsUp(arr, hintsArr) {
    arr.unshift([]);
    hintsArr.forEach((column) => {
      arr[0].push(column);
    });
  }

  function getHintsLeftArr(arr) {
    for (let i = 0; i < arr.length; i++) {
      let count = 0;
      for (let j = 0; j < arr[0].length; j++) {
        if (arr[i][j]) {
          count++;
        } else {
          hintsLeftArr[i].push(count);
          count = 0;
        }
      }
      hintsLeftArr[i].push(count);
    }
    let resHintsLeftArr = hintsLeftArr.map((row) =>
      row.filter((number) => number),
    );

    //
    const maxLength = getMaxLengthArr(resHintsLeftArr);
    resHintsLeftArr.forEach((arr) => {
      if (arr.length !== maxLength) {
        arr.length = maxLength;
        for (let i = 0; i < arr.length; i++) {
          if (!arr[i]) arr[i] = 0;
        }
      }
      arr.reverse();
    });
    //
    return resHintsLeftArr;
  }

  function addHintsLeft(arr, hintsArr) {
    arr[0].unshift(null);
    for (let i = 1; i < arr.length; i++) {
      arr[i].unshift([]);
    }
    for (let i = 0; i < hintsArr.length; i++) {
      arr[i + 1][0].push(...hintsArr[i]);
    }
  }

  addHintsUp(originalFullTemplateArr, getHintsUpArr(templateArr));
  addHintsLeft(originalFullTemplateArr, getHintsLeftArr(templateArr));
}

addHints();

function fillField(fullTemplateArr) {
  fullTemplateArr.forEach((templateRow) => {
    const row = new Node({ classNames: ['field__row'] });
    field.addNode(row);
    if (templateRow[0] !== null) {
      templateRow.forEach((templateCell) => {
        if (typeof templateCell === 'number') {
          const cell = new Node({ classNames: ['field__cell'] });
          row.addNode(cell);
          if (templateCell) cell.addClass('grey');
        } else {
          templateRow.forEach((item) => {
            if (Array.isArray(item)) {
              item.forEach((hint) => {
                const cell = new Node({ classNames: ['field__cell'] });
                row.addNode(cell);
                if (hint) cell.node.textContent = hint;
              });
            }
          });
        }
      });
    } else {
      templateRow.forEach((item) => {
        if (Array.isArray(item)) {
          const columnHint = new Node({ classNames: ['column-hint'] });
          item.forEach((hint) => {
            const cell = new Node({ classNames: ['field__cell'] });
            columnHint.addNode(cell);
            row.addNode(columnHint);
            if (hint) cell.node.textContent = hint;
          });
        }
      });
    }
  });
}

fillField(originalFullTemplateArr);

// ----------------------------------------------------------
