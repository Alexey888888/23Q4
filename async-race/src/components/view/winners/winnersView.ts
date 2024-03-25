import './winners.scss';

import BaseComponent from '../../baseComponent';
import { Api } from '../../../api/api';

export default class WinnersView extends BaseComponent {
  container: BaseComponent;

  title: BaseComponent;

  pageNumberNode: BaseComponent;

  pageNumber: number;

  limit: number;

  constructor() {
    super({ classNames: ['winners', 'page_hidden'] });
    this.title = new BaseComponent();
    this.pageNumberNode = new BaseComponent();
    this.container = new BaseComponent({ classNames: ['container'] }, this.title, this.pageNumberNode);
    this.pageNumber = 1;
    this.limit = 7;
    this.renderWinnersPage();
    this.setTotalNumberWinners();
    this.setPageNumber();
  }

  renderWinnersPage() {
    this.append(this.container);
  }

  async setTotalNumberWinners() {
    const totalNumberWinners = await Api.getWinners(this.pageNumber, this.limit);
    const titleInner = `Winners (${totalNumberWinners})`;
    this.title.setTextContent(titleInner);
  }

  setPageNumber() {
    const pageNumber = 1;
    const pageNumberContent = `Page #${pageNumber}`;
    this.pageNumberNode.setTextContent(pageNumberContent);
  }
}
