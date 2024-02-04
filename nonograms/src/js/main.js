import Node from './classNode.js';
import imageTemplates from './imageTemplates.json' assert { type: 'json' };

const { body } = document;

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
const gameBoxBlackout = new Node({
  classNames: ['game-box__blackout'],
  parentNode: gameBoxWrapper.node,
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
const gameBoardBlackout = new Node({
  classNames: ['game-board__blackout'],
  parentNode: gameBoard.node,
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
const closeBtn = new Node({
  classNames: ['btn', 'modal-window__close-btn'],
  texContent: 'Close',
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

const gameDuration = new Node({
  classNames: ['game-duration'],
  parentNode: gameBoard.node,
});

//

const resetGameBtn = new Node({
  classNames: ['btn'],
  parentNode: toolsUpWrapper.node,
  texContent: 'Reset game',
});

const randomGameBtn = new Node({
  classNames: ['btn'],
  parentNode: toolsUpWrapper.node,
  texContent: 'Random game',
});

const soundBtn = new Node({
  classNames: ['btn'],
  parentNode: toolsUpWrapper.node,
});

const soundBtnIcon = new Node({
  tagName: 'img',
  classNames: ['sound-btn__icon'],
  parentNode: soundBtn.node,
});
soundBtnIcon.node.src = './src/img/png/sound-on.png';

const saveGameBtn = new Node({
  classNames: ['btn'],
  parentNode: toolsDownWrapper.node,
  texContent: 'Save game',
});

const continueGameBtn = new Node({
  classNames: ['btn'],
  parentNode: toolsDownWrapper.node,
  texContent: 'Continue last game',
});

const solutionBtn = new Node({
  classNames: ['btn'],
  parentNode: toolsDownWrapper.node,
  texContent: 'Solution',
});

const highScoreBtn = new Node({
  classNames: ['btn'],
  parentNode: toolsDownWrapper.node,
  texContent: 'High score',
});

const themeBtn = new Node({
  classNames: ['btn'],
  parentNode: toolsDownWrapper.node,
});

const themeBtnIcon = new Node({
  tagName: 'img',
  classNames: ['theme-btn__icon'],
  parentNode: themeBtn.node,
});
themeBtnIcon.node.src = './src/img/png/theme_light_dark_icon.png';

// ----------------------------------------------------------

const paintSound = new Audio('./src/audio/paint.mp3');
const crossSound = new Audio('./src/audio/cross.mp3');
const removeSound = new Audio('./src/audio/remove.mp3');
const winSound = new Audio('./src/audio/win.mp3');

//-----------------------------------------------------------

let solutionMode = false;
let originalFullTemplateArr = null;
let currentTemplateArr = null;
let templateArr = null;
let hintsUpArr = null;
let hintsLeftArr = null;
let sec = 0;
let isDuration = false;
let timerID;
let timerIDforPulseCloseBtn;
let isSound = true;
let win = false;
let templateNum = 0;
localStorage.setItem('templateNum_888888', templateNum);

templateArr = imageTemplates[templateNum].imageArr;

function startGame() {
  solutionMode = false;
  win = false;
  field.node.innerHTML = '';
  clearInterval(timerID);
  gameDuration.node.textContent = '00:00';
  isDuration = false;
  sec = 0;
  originalFullTemplateArr = copyArr(templateArr);
  hintsUpArr = Array.from({ length: templateArr[0].length }, () => []);
  hintsLeftArr = Array.from({ length: templateArr.length }, () => []);
  addHints();
  fillField(originalFullTemplateArr);
  initCurrentTemplateArr();
  addClickCellHandler();
  closeGameBoardBlackout();
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
  if (event.target.classList.contains('black')) currentTemplateArr[i][j] = 1;
  if (!event.target.classList.contains('black')) currentTemplateArr[i][j] = 0;
  if (event.target.textContent === '✖') currentTemplateArr[i][j] = 2;
  checkGameStatus();
}

function checkGameStatus() {
  if (
    JSON.stringify(
      currentTemplateArr.map((row) => row.map((el) => (el === 2 ? 0 : el))),
    ) === JSON.stringify(templateArr)
  ) {
    win = true;
    isDuration = false;
    openGameBoardBlackout();
    clearInterval(timerID);
    openModal('win');
    setScore();
  }
}

function leftClickCellHandler(event) {
  if (event.target.classList.contains('field__cell')) {
    if (!event.target.classList.contains('black') && isSound) paintSound.play();
    if (event.target.classList.contains('black') && isSound) removeSound.play();
    if (!isDuration) startGameDuration();
    event.target.textContent = '';
    if (event.target.classList.contains('field__cell')) {
      event.target.classList.toggle('black');
    }
    const numClickedRow = getNumClickedRow(event);
    const numClickedCell = getNumClickedCell(event);
    fillCurrentTemplateArr(numClickedRow, numClickedCell, event);
  }
}

function rightClickHandler(event) {
  if (event.target.classList.contains('field__cell')) {
    if (!isDuration) startGameDuration();
    if (event.target.textContent !== '✖' && isSound) crossSound.play();
    if (event.target.textContent === '✖' && isSound) removeSound.play();
    event.preventDefault();
    event.target.classList.remove('black');
    if (event.target.textContent !== '✖') {
      event.target.textContent = '✖';
    } else event.target.textContent = '';
  }
  const numClickedRow = getNumClickedRow(event);
  const numClickedCell = getNumClickedCell(event);
  fillCurrentTemplateArr(numClickedRow, numClickedCell, event);
}

function addClickCellHandler() {
  body.addEventListener('click', leftClickCellHandler);
  body.addEventListener('contextmenu', rightClickHandler);
}

// ----

function openModal(flag, mode) {
  modalWindowInner.node.textContent = '';

  function afterCloseModalWindow() {
    if (flag === 'win') {
      openGameBoxBlackout();
      if (isSound) winSound.play();
      modalWindowInner.addText(
        `Great! You have solved the nonogram in ${sec} seconds!`,
      );
    }

    if (flag === 'level') {
      openGameBoxBlackout();
      const levelList = new Node({
        classNames: ['level__list'],
        parentNode: modalWindowInner.node,
      });
      let size = '';
      switch (mode) {
        case 'easy':
          size = '5x5';
          break;
        case 'medium':
          size = '10x10';
          break;
        case 'hard':
          size = '15x15';
          break;
      }
      new Node({
        parentNode: levelList.node,
        texContent: `${mode} ${size}`,
        classNames: ['level__list__title'],
      });
      imageTemplates.forEach((image) => {
        if (image.level === mode) {
          const levelItem = new Node({
            classNames: ['level__item', 'btn'],
            parentNode: levelList.node,
          });
          levelItem.addText(image.title);
          levelItem.node.addEventListener('click', (event) => {
            closeGameBoxBlackout();
            const template = event.target.innerHTML;
            closeModalWindow();
            playNewGame(template);
          });
        }
      });
    }

    if (flag === 'error' && mode === 'save') {
      modalWindowInner.addText('You have no saved games!');
      openGameBoxBlackout();
    }

    if (flag === 'error' && mode === 'win') {
      modalWindowInner.addText("You can't save finalized game!");
      openGameBoxBlackout();
    }

    if (flag === 'score') {
      openGameBoxBlackout();
      const scoreArr = JSON.parse(localStorage.getItem('scoreArr_888888'));
      scoreArr.sort((a, b) => a.durationSec - b.durationSec);
      const resultTable = new Node({
        tagName: 'table',
        classNames: ['result__table'],
        parentNode: modalWindowInner.node,
      });
      const resultTableHead = new Node({
        tagName: 'tr',
        parentNode: resultTable.node,
      });
      new Node({
        tagName: 'th',
        parentNode: resultTableHead.node,
      });
      const columnHead2 = new Node({
        tagName: 'th',
        parentNode: resultTableHead.node,
      });
      columnHead2.addText('solved puzzle');
      const columnHead3 = new Node({
        tagName: 'th',
        parentNode: resultTableHead.node,
      });
      columnHead3.addText('difficulty');
      const columnHead4 = new Node({
        tagName: 'th',
        parentNode: resultTableHead.node,
      });
      columnHead4.addText('stop-watch');

      let num = 0;
      scoreArr.forEach((result) => {
        num++;
        const resultRow = new Node({
          tagName: 'tr',
          parentNode: resultTable.node,
        });
        const column1 = new Node({ tagName: 'td', parentNode: resultRow.node });
        column1.addText(num);
        const column2 = new Node({ tagName: 'td', parentNode: resultRow.node });
        column2.addText(result.title);
        const column3 = new Node({ tagName: 'td', parentNode: resultRow.node });
        column3.addText(result.level);
        const column4 = new Node({ tagName: 'td', parentNode: resultRow.node });
        column4.addText(result.durationMinSec);
      });
    }

    if (flag === 'error' && mode === 'score') {
      modalWindowInner.addText('You have no results in score yet!');
      openGameBoxBlackout();
    }

    if (flag === 'error' && mode === 'solutionMode') {
      modalWindowInner.addText("You can't save the game scored with solution!");
      openGameBoxBlackout();
    }

    modalWindow.addClass('modal-window_open');

    function pulseCloseBtn() {
      timerIDforPulseCloseBtn = setInterval(() => {
        closeBtn.node.classList.toggle('pulse');
      }, 500);
    }

    pulseCloseBtn();
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

function openGameBoxBlackout() {
  gameBoxBlackout.node.classList.add('game-box__blackout_active');
}

function closeGameBoxBlackout() {
  gameBoxBlackout.node.classList.remove('game-box__blackout_active');
}

function openGameBoardBlackout() {
  gameBoardBlackout.node.classList.add('game-board__blackout_active');
}

function closeGameBoardBlackout() {
  gameBoardBlackout.node.classList.remove('game-board__blackout_active');
}

function closeModalWindow() {
  clearInterval(timerIDforPulseCloseBtn);
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
  sec = 0;
  imageTemplates.forEach((template) => {
    if (template.title === templateName) {
      templateArr = template.imageArr;
      templateNum = template.id;
      localStorage.setItem('templateNum_888888', templateNum);
    }
  });
  startGame();
}

resetGameBtn.node.addEventListener('click', () => {
  modalWindow.removeClass('modal-window_open');
  startGame();
});

//--

function startGameDuration() {
  isDuration = true;
  timerID = setInterval(() => {
    sec++;
    gameDuration.node.textContent =
      String(Math.floor(sec / 60)).padStart(2, '0') +
      ':' +
      String(sec % 60).padStart(2, '0');
  }, 1000);
}

// --

function soundBtnHandler() {
  soundBtn.node.addEventListener('click', () => {
    if (isSound) {
      soundBtnIcon.node.src = './src/img/png/sound-off.png';
      isSound = false;
    } else {
      soundBtnIcon.node.src = './src/img/png/sound-on.png';
      isSound = true;
    }
  });
}

soundBtnHandler();

function themeBtnHandler() {
  themeBtn.node.addEventListener('click', () => {
    background.node.classList.toggle('main-background_dark');
    gameBox.node.classList.toggle('game-box_dark');
    modalWindow.node.classList.toggle('modal-window_dark');
  });
}

themeBtnHandler();

// -----------------------

function saveBtnHandler() {
  saveGameBtn.node.addEventListener('click', saveGame);
}

function saveGame() {
  closeModalWindow();
  if (!solutionMode) {
    if (win === true) {
      closeModalWindow();
      openModal('error', 'win');
    } else {
      localStorage.setItem('templateArr_888888', JSON.stringify(templateArr));
      localStorage.setItem(
        'currentTemplateArr_888888',
        JSON.stringify(currentTemplateArr),
      );
      localStorage.setItem('gameDuration_888888', sec);
      localStorage.setItem('templateNumSavedGame_888888', templateNum);
    }
  } else openModal('error', 'solutionMode');
}

function continueBtnHandler() {
  continueGameBtn.node.addEventListener('click', () => {
    closeModalWindow();
    if (
      localStorage.getItem('templateArr_888888') &&
      localStorage.getItem('currentTemplateArr_888888') &&
      localStorage.getItem('gameDuration_888888')
    ) {
      continueGame();
    } else openModal('error', 'save');
  });
}

function continueGame() {
  templateArr = JSON.parse(localStorage.getItem('templateArr_888888'));
  templateNum = localStorage.getItem('templateNumSavedGame_888888');
  localStorage.setItem('templateNum_888888', templateNum);
  console.log(templateNum);
  startGame();
  currentTemplateArr = JSON.parse(
    localStorage.getItem('currentTemplateArr_888888'),
  );
  fieldRecovery();
  gameDurationRecovery();
}

function fieldRecovery() {
  const startFieldArr = Array.from(field.node.children);
  startFieldArr.shift();
  let totalLeftHintNumber = 0;
  startFieldArr.forEach((row) => {
    Array.from(row.children).forEach((cell) => {
      if (!cell.classList.contains('field__cell')) totalLeftHintNumber++;
    });
  });
  const displacement = totalLeftHintNumber / startFieldArr.length;
  for (let i = 0; i < currentTemplateArr.length; i++) {
    for (let j = 0; j < currentTemplateArr[0].length; j++) {
      if (currentTemplateArr[i][j] === 1)
        startFieldArr[i].children[j + displacement].classList.add('black');
      if (currentTemplateArr[i][j] === 2)
        startFieldArr[i].children[j + displacement].textContent = '✖';
    }
  }
}

function gameDurationRecovery() {
  sec = localStorage.getItem('gameDuration_888888');
  gameDuration.node.textContent =
    String(Math.floor(sec / 60)).padStart(2, '0') +
    ':' +
    String(sec % 60).padStart(2, '0');
}

saveBtnHandler();
continueBtnHandler();

function addCloseBtnHandler() {
  closeBtn.node.addEventListener('click', () => {
    closeModalWindow();
    closeGameBoxBlackout();
  });
}

addCloseBtnHandler();

// ----------

function getRandomNum() {
  const randomNum = Math.floor(Math.random() * imageTemplates.length);
  return randomNum;
}

function setTemplateNumLocalStorage() {
  templateNum = getRandomNum();
  if (localStorage.getItem('templateNum_888888')) {
    if (+localStorage.getItem('templateNum_888888') === templateNum)
      setTemplateNumLocalStorage();
  }
  localStorage.setItem('templateNum_888888', templateNum);
}

function addRandomGameBtnHandler() {
  randomGameBtn.node.addEventListener('click', () => {
    closeModalWindow();
    setTemplateNumLocalStorage();
    templateArr = imageTemplates[templateNum].imageArr;
    startGame();
  });
}

addRandomGameBtnHandler();

function setScore() {
  if (!localStorage.getItem('scoreArr_888888'))
    localStorage.setItem('scoreArr_888888', JSON.stringify([]));

  const scoreArr = JSON.parse(localStorage.getItem('scoreArr_888888'));
  scoreArr.push({
    title: imageTemplates[templateNum].title,
    level: imageTemplates[templateNum].level,
    durationMinSec:
      String(Math.floor(sec / 60)).padStart(2, '0') +
      ':' +
      String(sec % 60).padStart(2, '0'),
    durationSec: sec,
  });

  if (scoreArr.length > 5) scoreArr.shift();

  localStorage.setItem('scoreArr_888888', JSON.stringify(scoreArr));
}

function addHighScoreBtnHandler() {
  highScoreBtn.node.addEventListener('click', () => {
    if (localStorage.getItem('scoreArr_888888')) {
      openModal('score');
    } else openModal('error', 'score');
  });
}

addHighScoreBtnHandler();

function addSolutionBtnHandler() {
  solutionBtn.node.addEventListener('click', displaySolution);
}

addSolutionBtnHandler();

function displaySolution() {
  solutionMode = true;

  openGameBoardBlackout();
  const cells = document.querySelectorAll('.field__cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove('black');
    cells[i].textContent = '';
    if (imageTemplates[templateNum].imageArr.flat()[i] === 1)
      cells[i].classList.add('black');
  }
  clearInterval(timerID);
}
