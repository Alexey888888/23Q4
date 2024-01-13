import abc from './abcArr.js';
import questions from './questionsArr.js';

const { body } = document;
let questionNum = null;
let secret = null;
const letterArr = [];
const hangmanArr = [];
const keysArr = [];
let countBodyHangman = 0;
let countSecretWord = 0;

function createNode(tagName, classNames, textContent, parentNode) {
  const node = document.createElement(tagName);
  if (classNames) node.classList.add(...classNames);
  if (textContent) node.textContent = textContent;
  if (parentNode) parentNode.append(node);
  return node;
}

const modalWindow = createNode('div', ['modal', 'hidden'], null, body);
const modalWrapper = createNode('div', ['modal__wrapper'], null, modalWindow);
const modalMessage = createNode('p', ['modal__message'], null, modalWrapper);
const modalSecret = createNode('p', ['modal__secret-word'], null, modalWrapper);
const modalBtn = createNode('button', ['modal__btn'], 'Play again', modalWrapper);

const wrapper = createNode('div', ['wrapper'], null, body);
const container = createNode('div', ['container'], null, wrapper);
const blackout = createNode('div', ['blackout', 'hidden'], null, body);

const gallows = createNode('section', ['gallows'], null, container);
const gallowsWrapper = createNode('div', ['gallows__wrapper'], null, gallows);
const gallowsImage = createNode('div', ['gallows__gallows-image'], null, gallowsWrapper);
const gallowsImg = createNode('img', null, null, gallowsImage);
gallowsImg.src = './src/img/png/gallows.png';
gallowsImg.alt = 'gallows';
const hangman = createNode('div', ['gallows-image__hangman'], null, gallowsImage);
hangmanArr.push(createNode('div', ['hangman__head'], null, hangman));
hangmanArr.push(createNode('div', ['hangman__body'], null, hangman));
hangmanArr.push(createNode('div', ['hangman__hand-one'], null, hangman));
hangmanArr.push(createNode('div', ['hangman__hand-two'], null, hangman));
hangmanArr.push(createNode('div', ['hangman__leg-one'], null, hangman));
hangmanArr.push(createNode('div', ['hangman__leg-two'], null, hangman));
createNode('h1', null, 'HANGMAN GAME', gallowsWrapper);

const quiz = createNode('section', ['quiz'], null, container);
const quizWrapper = createNode('div', ['quiz__wrapper'], null, quiz);
const secretWord = createNode('div', ['secret-word'], null, quizWrapper);
const hint = createNode('div', ['hint'], null, quizWrapper);
const incorrectGuessesCounter = createNode(
  'div',
  ['incorrect-guesses-counter'],
  `Incorrect guesses: ${countBodyHangman}/6`,
  quizWrapper,
);
const keyboard = createNode('div', ['keyboard'], null, quizWrapper);
const keyboardWrapper = createNode('div', ['keyboard__wrapper'], null, keyboard);

function displayModal() {
  modalWindow.classList.remove('hidden');
  blackout.classList.remove('hidden');
  if (countBodyHangman === 6) {
    modalMessage.textContent = 'You lose!';
  } else {
    modalMessage.textContent = 'Congratulations! You win!!';
  }
  modalSecret.textContent = `Secret word: ${secret.toUpperCase()}`;
}

function disableKey(letter) {
  keysArr.forEach((key) => {
    if (key.dataset.id === `Key${letter}`) key.classList.add('key_disable');
  });
}

function endingGame() {
  document.removeEventListener('keydown', keydownHandler);
  setTimeout(() => displayModal(), 500);
}

function displayHangman() {
  if (countBodyHangman < 6) hangmanArr[countBodyHangman].classList.remove('hidden');
  countBodyHangman += 1;
  if (countBodyHangman === 6) {
    endingGame();
  }
}

function changeCountValue() {
  incorrectGuessesCounter.textContent = `Incorrect guesses: ${countBodyHangman}/6`;
}

function checkLetter(letter) {
  let isAlreadyWas = false;
  keysArr.forEach((key) => {
    if (key.dataset.id === `Key${letter}` && key.classList.contains('key_disable')) isAlreadyWas = true;
  });
  if (!isAlreadyWas) {
    disableKey(letter);
    if (secret.toLowerCase().includes(letter.toLowerCase())) {
      for (let i = 0; i < secret.length; i += 1) {
        if (secret.toLowerCase()[i] === letter.toLowerCase()) {
          letterArr[i].textContent = letter;
          countSecretWord += 1;
          if (countSecretWord === secret.length) {
            endingGame();
          }
        }
      }
    } else {
      displayHangman();
      changeCountValue();
    }
  }
}

function keydownHandler(event) {
  abc.forEach((item) => {
    if (event.code === item.code) checkLetter(item.value);
  });
}

function keyClickHandler() {
  abc.forEach((item) => {
    if (item.code === this.dataset.id) checkLetter(item.value);
  });
}

function createKeyboard() {
  abc.forEach((item) => {
    const key = createNode('span', ['keyboard__key'], item.value, keyboardWrapper);
    key.dataset.id = item.code;
    key.addEventListener('click', keyClickHandler);
    keysArr.push(key);
  });
}

function getRandomNum() {
  const randomNum = Math.floor(Math.random() * questions.length);
  return randomNum;
}

function setLocalStorage() {
  questionNum = getRandomNum();
  if (localStorage.getItem('questionNum')) {
    if (+localStorage.getItem('questionNum') === questionNum) setLocalStorage();
  }
  localStorage.setItem('questionNum', questionNum);
}

function displayHint() {
  setLocalStorage();
  hint.textContent = `Hint: ${questions[questionNum].hint}`;
}

function fillSecretWord() {
  secret = questions[questionNum].answer;
  for (let i = 0; i < secret.length; i += 1) {
    letterArr.push(createNode('div', ['letter'], '_', secretWord));
  }
}

function addKeydownListener() {
  document.addEventListener('keydown', keydownHandler);
}

function hideHangman() {
  hangmanArr.forEach((item) => item.classList.add('hidden'));
}

function clearKeyDisable() {
  keysArr.forEach((key) => {
    key.classList.remove('key_disable');
  });
}

function playAgain() {
  clearKeyDisable();
  countBodyHangman = 0;
  incorrectGuessesCounter.textContent = `Incorrect guesses: ${countBodyHangman}/6`;
  letterArr.length = 0;
  countSecretWord = 0;
  blackout.classList.add('hidden');
  modalWindow.classList.add('hidden');
  hideHangman();
  displayHint();
  secretWord.textContent = '';
  fillSecretWord();
  addKeydownListener();
}

function addEventListenerBtn() {
  modalBtn.addEventListener('click', playAgain);
}

hideHangman();
createKeyboard();
displayHint();
fillSecretWord();
addKeydownListener();
addEventListenerBtn();
