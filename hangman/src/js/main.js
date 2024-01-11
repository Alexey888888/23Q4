import { abc } from './abc.js';

const { body } = document;

body.innerHTML = '';

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
const hangmanHead = createNode('div', ['hangman__head'], null, hangman);
const hangmanBody = createNode('div', ['hangman__body'], null, hangman);
const hangmanHandOne = createNode('div', ['hangman__hand-one'], null, hangman);
const hangmanHandTwo = createNode('div', ['hangman__hand-two'], null, hangman);
const hangmanLegOne = createNode('div', ['hangman__leg-one'], null, hangman);
const hangmanLegTwo = createNode('div', ['hangman__leg-two'], null, hangman);
const title = createNode('h1', null, 'HANGMAN GAME', gallowsWrapper);

const quiz = createNode('section', ['quiz'], null, container);
const quizWrapper = createNode('div', ['quiz__wrapper'], null, quiz);
const secretWord = createNode('div', ['secret-word'], '_ _ _ _ _ _ _ _', quizWrapper);
const question = createNode('div', ['question'], 'What is the capital of Great Britain?', quizWrapper);
const incorrectGuessesCounter = createNode('div', ['incorrect-guesses-counter'], 'Incorrect guesses: 0/6', quizWrapper);
const keyboard = createNode('div', ['keyboard'], null, quizWrapper);
const keyboardWrapper = createNode('div', ['keyboard__wrapper'], null, keyboard);

abc.forEach((item) => {
  const key = createNode('span', ['keyboard__key'], item.value, keyboardWrapper);
  key.dataset.id = item.code;
});
