import './gameStyles.scss';

import BaseComponent from '../../baseComponent';
import wordCollectionLevel1 from '../../../data/word-collection/wordCollectionLevel1.json';
import Button from '../../button/button';

export class Game {
  container: BaseComponent;

  resultBlock: BaseComponent;

  sourceBlock: BaseComponent;

  resultRow: BaseComponent;

  continueButton: Button;

  wordIndex: number;

  roundIndex: number;

  constructor() {
    this.wordIndex = 0;
    this.roundIndex = 0;
    this.resultRow = new BaseComponent({ classNames: ['result-row'] });
    this.resultBlock = new BaseComponent({ classNames: ['result-block'] });
    this.sourceBlock = new BaseComponent({ classNames: ['source-block'] });
    this.continueButton = new Button({
      classNames: ['button', 'button_disabled', 'continue-button'],
      text: 'Continue',
      disabled: true,
      onClick: () => {
        if (this.roundIndex === wordCollectionLevel1.roundsCount - 1) this.roundIndex = 0;
        if (this.wordIndex === wordCollectionLevel1.rounds[this.roundIndex].words.length - 1) {
          this.startNewRound();
        } else {
          this.wordIndex += 1;
          this.fillSourceBlock(null);
          this.resultRow = new BaseComponent({ classNames: ['result-row'] });
          this.resultBlock.append(this.resultRow);
          this.continueButton.setDisabled(true);
          this.continueButton.addClass(['button_disabled']);
        }
      },
    });
    this.container = new BaseComponent(
      { classNames: ['container'] },
      new BaseComponent(
        { classNames: ['game'] },
        new BaseComponent(
          { classNames: ['game-wrapper'] },
          this.resultBlock,
          this.sourceBlock,
          new BaseComponent({ classNames: ['tools-down'] }, this.continueButton),
        ),
      ),
    );
  }

  start() {
    document.body.append(this.container.getNode());
    this.fillSourceBlock(null);
  }

  fillSourceBlock(backWordCard: BaseComponent | null) {
    if (backWordCard) {
      this.sourceBlock.getNode().append(backWordCard.getNode());
      const onClick = () => {
        this.fillResultBlock(backWordCard, this.resultRow);
        backWordCard.removeListener('click', onClick);
      };
      backWordCard.addListener('click', onClick);
    } else {
      this.resultBlock.getNode().append(this.resultRow.getNode());
      const wordsArr = wordCollectionLevel1.rounds[this.roundIndex].words[this.wordIndex].textExample.split(' ');
      let shuffledWords = [...wordsArr];
      do {
        shuffledWords = shuffledWords.sort(() => Math.random() - 0.5);
      } while (JSON.stringify(wordsArr) === JSON.stringify(shuffledWords));
      shuffledWords.forEach((word) => {
        const wordCard = new BaseComponent({ classNames: ['word'] });
        const onClick = () => {
          this.fillResultBlock(wordCard, this.resultRow);
          wordCard.removeListener('click', onClick);
        };
        wordCard.addListener('click', onClick);
        wordCard.setTextContent(word);
        const wordWidth = (word.length * 100) / shuffledWords.length;
        wordCard.getNode().style.width = `${wordWidth}%`;
        setTimeout(() => {
          const currentWidth = wordCard.getNode().offsetWidth;
          wordCard.getNode().style.maxWidth = `${currentWidth}px`;
        }, 1);
        this.sourceBlock.getNode().append(wordCard.getNode());
      });
    }
  }

  fillResultBlock(wordCard: BaseComponent, resultRow: BaseComponent) {
    resultRow.getNode().append(wordCard.getNode());
    const onClick = () => {
      this.fillSourceBlock(wordCard);
      wordCard.removeListener('click', onClick);
    };
    wordCard.addListener('click', onClick);
    this.checkSentence();
  }

  checkSentence() {
    const words = this.resultRow.getNode().children;
    const currentSentence = Array.from(words)
      .map((word) => word.textContent)
      .join(' ');
    console.log(currentSentence);
    const example = wordCollectionLevel1.rounds[this.roundIndex].words[this.wordIndex].textExample;
    if (currentSentence === example) this.continueButtonOn();
  }

  continueButtonOn() {
    this.continueButton.setDisabled(false);
    this.continueButton.removeClass('button_disabled');
    this.resultRow.append(new BaseComponent({ classNames: ['blocked'] }));
  }

  startNewRound() {
    this.wordIndex = 0;
    this.roundIndex += 1;
    this.resultRow.destroy();
    this.resultBlock.destroyChildren();
    this.resultBlock.getNode().innerHTML = '';
    this.resultRow = new BaseComponent({ classNames: ['result-row'] });
    this.resultBlock.append(this.resultRow);
    this.fillSourceBlock(null);
    this.continueButton.setDisabled(true);
    this.continueButton.addClass(['button_disabled']);
  }
}

export const game = new Game();
