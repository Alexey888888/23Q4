import { abc } from './abcArr.js';
import { questions } from './questionsArr.js';

const { body } = document;
let questionNum = null;
let secret = null;
const letterArr = [];
const hangmanArr = [];
let countBodyHangman = 0;

function createNode(tagName, classNames, textContent, parentNode) {
  const node = document.createElement(tagName);
  if (classNames) node.classList.add(...classNames);
  if (textContent) node.textContent = textContent;
  if (parentNode) parentNode.append(node);
  return node;
}

const wrapper = createNode('div', ['wrapper'], null, body);
const container = createNode('div', ['container'], null, wrapper);

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
const title = createNode('h1', null, 'HANGMAN GAME', gallowsWrapper);

const quiz = createNode('section', ['quiz'], null, container);
const quizWrapper = createNode('div', ['quiz__wrapper'], null, quiz);
const secretWord = createNode('div', ['secret-word'], null, quizWrapper);
const hint = createNode('div', ['hint'], null, quizWrapper);
const incorrectGuessesCounter = createNode(
  'div',
  ['incorrect-guesses-counter'],
  `Incorrect guesses: ${countBodyHangman}/6`,
  quizWrapper
);
const keyboard = createNode('div', ['keyboard'], null, quizWrapper);
const keyboardWrapper = createNode('div', ['keyboard__wrapper'], null, keyboard);

function displayHangman() {
  hangmanArr[countBodyHangman].classList.remove('hangman_hidden');
  countBodyHangman += 1;
}

function changeCountValue() {
  incorrectGuessesCounter.textContent = `Incorrect guesses: ${countBodyHangman}/6`;
}

function checkLetter(letter) {
  if (secret.toLowerCase().includes(letter.toLowerCase())) {
    for (let i = 0; i < secret.length; i += 1) {
      if (secret.toLowerCase()[i] === letter.toLowerCase()) letterArr[i].textContent = letter;
    }
  } else {
    displayHangman();
    changeCountValue();
  }
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

function keydownHandler(event) {
  abc.forEach((item) => {
    if (event.code === item.code) checkLetter(item.value);
  });
}

function addKeydownListener() {
  document.addEventListener('keydown', (event) => {
    keydownHandler(event);
  });
}

function hideHangman() {
  hangmanArr.forEach((item) => item.classList.add('hangman_hidden'));
}

hideHangman();
createKeyboard();
displayHint();
fillSecretWord();
addKeydownListener();
