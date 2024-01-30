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
  classNames: ['tools-up__wrapper'],
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
  classNames: ['tools-down__wrapper'],
  parentNode: toolsDown.node,
});
// ----------------------------------------------------------
const modalWindow = new Node({
  classNames: ['modal-window'],
  parentNode: gameBoard.node,
});
const modalWindowInner = new Node({
  classNames: ['modal-window__inner'],
  parentNode: modalWindow.node,
});
// ----------------------------------------------------------
const levelBtnWrapper = new Node({
  classNames: ['level-btn__wrapper'],
  parentNode: toolsUpWrapper.node,
});

const levelBtnEasy = new Node({
  classNames: ['btn', 'level-btn__easy'],
  parentNode: levelBtnWrapper.node,
  texContent: 'easy',
});
const levelBtnMedium = new Node({
  classNames: ['btn', 'level-btn__medium'],
  parentNode: levelBtnWrapper.node,
  texContent: 'medium',
});
const levelBtnHard = new Node({
  classNames: ['btn', 'level-btn__hard'],
  parentNode: levelBtnWrapper.node,
  texContent: 'hard',
});

// ----------------------------------------------------------
let originalFullTemplateArr = null;
let currentTemplateArr = null;
let templateArr = null;
let hintsUpArr = null;
let hintsLeftArr = null;

templateArr = imageTemplates[0].imageArr;

function startGame() {
  field.node.innerHTML = '';

  originalFullTemplateArr = copyArr(templateArr);
  hintsUpArr = Array.from({ length: templateArr[0].length }, () => []);
  hintsLeftArr = Array.from({ length: templateArr.length }, () => []);
  addHints();
  fillField(originalFullTemplateArr);
  initCurrentTemplateArr();
  addClickHandler();
}

startGame();

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
      //arr.reverse();
      arr.sort((a, b) => {
        if (a === 0) return -1;
        if (a !== 0 && b === 0) return 1;
        if (a !== 0 && b !== 0) return 0;
      });
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
      //  arr.reverse();
      arr.sort((a, b) => {
        if (a === 0) return -1;
        if (a !== 0 && b === 0) return 1;
        if (a !== 0 && b !== 0) return 0;
      });
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
                const cell = new Node({ classNames: ['field__cell_hint'] });
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
            const cell = new Node({ classNames: ['field__cell_hint'] });
            columnHint.addNode(cell);
            row.addNode(columnHint);
            if (hint) cell.node.textContent = hint;
          });
        }
      });
    }
  });
}

// -----------------------------------------------------------

function initCurrentTemplateArr() {
  currentTemplateArr = Array.from({ length: templateArr.length }, () =>
    Array.from({ length: templateArr[0].length }, () => 0),
  );
}

function getNumClickedRow(event) {
  const clickedRow = event.target.parentNode;
  const parentNode = clickedRow.parentNode;
  const childrenRowArr = Array.from(parentNode.children);
  const numClickedRow = childrenRowArr.indexOf(clickedRow) - 1;
  return numClickedRow;
}

function getNumClickedCell(event) {
  const clickedCell = event.target;
  const parentNode = clickedCell.parentNode;
  let childrenCellArr = Array.from(parentNode.children);
  for (let i = 0; i < childrenCellArr.length; i++) {
    if (childrenCellArr[i].className === 'field__cell_hint')
      childrenCellArr[i] = 0;
  }
  childrenCellArr = childrenCellArr.filter((cell) => cell);
  const numClickedCell = childrenCellArr.indexOf(clickedCell);
  return numClickedCell;
}

function fillCurrentTemplateArr(i, j, event) {
  if (event.target.classList.contains('black')) {
    currentTemplateArr[i][j] = 1;
  } else currentTemplateArr[i][j] = 0;
  checkGameStatus();
}

function checkGameStatus() {
  if (JSON.stringify(currentTemplateArr) === JSON.stringify(templateArr)) {
    openModal('win');
  }
}

function addClickHandler() {
  body.addEventListener('click', (event) => {
    if (event.target.classList.contains('field__cell')) {
      if (event.target.classList.contains('field__cell')) {
        event.target.classList.toggle('black');
      }
      const numClickedRow = getNumClickedRow(event);
      const numClickedCell = getNumClickedCell(event);
      fillCurrentTemplateArr(numClickedRow, numClickedCell, event);
    }
  });
}

// ----

function openModal(flag, mode) {
  modalWindowInner.node.textContent = '';

  function afterCloseModalWindow() {
    if (flag === 'win') {
      modalWindowInner.addText('Great! You have solved the nonogram!');
    }

    if (flag === 'level') {
      const levelList = new Node({
        classNames: ['level__list'],
        parentNode: modalWindowInner.node,
      });
      imageTemplates.forEach((image) => {
        if (image.level === mode) {
          const levelItem = new Node({
            classNames: ['level__item', 'btn'],
            parentNode: levelList.node,
          });
          levelItem.addText(image.title);
          levelItem.node.addEventListener('click', (event) => {
            const template = event.target.innerHTML;
            closeModalWindow();
            playNewGame(template);
          });
        }
      });
    }

    modalWindow.addClass('modal-window_open');
  }

  if (modalWindow.node.classList.contains('modal-window_open')) {
    closeModalWindow();
    setTimeout(() => {
      afterCloseModalWindow();
    }, 500);
  } else {
    afterCloseModalWindow();
  }
}

function closeModalWindow() {
  modalWindow.removeClass('modal-window_open');
}

// ---
const levelBtnArr = [];

function createLevelBtn() {
  levelBtnArr.push(levelBtnEasy.node, levelBtnMedium.node, levelBtnHard.node);
  levelBtnArr.forEach((btn) =>
    btn.addEventListener('click', (event) => {
      const mode = event.target.textContent;
      openModal('level', mode);
    }),
  );
}

createLevelBtn();

function playNewGame(templateName) {
  imageTemplates.forEach((template) => {
    if (template.title === templateName) templateArr = template.imageArr;
  });
  startGame();
}
