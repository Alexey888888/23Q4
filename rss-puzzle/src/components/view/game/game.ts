import './gameStyles.scss';

import BaseComponent from '../../baseComponent';
import wordCollectionLevel1 from '../../../data/word-collection/wordCollectionLevel1.json';

export class Game {
  container: BaseComponent;

  resultBlock: BaseComponent;

  sourceBlock: BaseComponent;

  constructor() {
    this.resultBlock = new BaseComponent({ classNames: ['result-block'] });
    this.sourceBlock = new BaseComponent({ classNames: ['source-block'] });
    this.container = new BaseComponent(
      { classNames: ['container'] },
      new BaseComponent(
        { classNames: ['game'] },
        new BaseComponent({ classNames: ['game-wrapper'] }, this.resultBlock, this.sourceBlock),
      ),
    );
  }

  start() {
    document.body.append(this.container.getNode());
    this.fillSourceBlock();
  }

  fillSourceBlock() {
    const resultRow = new BaseComponent({ classNames: ['result-row'] });
    this.resultBlock.getNode().append(resultRow.getNode());
    const wordsArr = wordCollectionLevel1.rounds[0].words[0].textExample.split(' ');
    const shuffledWords = wordsArr.sort(() => Math.random() - 0.5);
    shuffledWords.forEach((word) => {
      const wordCard = new BaseComponent({ classNames: ['word'] });
      const onClick = () => {
        Game.fillResultBlock(wordCard, resultRow);
        wordCard.removeListener('click', onClick);
      };
      wordCard.addListener('click', onClick);
      wordCard.setTextContent(word);
      this.sourceBlock.getNode().append(wordCard.getNode());
    });
  }

  static fillResultBlock(wordCard: BaseComponent, resultRow: BaseComponent) {
    resultRow.getNode().append(wordCard.getNode());
  }
}

export const game = new Game();
