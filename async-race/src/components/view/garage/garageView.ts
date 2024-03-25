import './garage.scss';

import BaseComponent from '../../baseComponent';
import Api from '../../../api/api';

export default class GarageView extends BaseComponent {
  container: BaseComponent;

  title: BaseComponent;

  pageNumberNode: BaseComponent;

  pageNumber: number;

  limit: number;

  constructor() {
    super({ classNames: ['garage'] });
    this.title = new BaseComponent();
    this.pageNumberNode = new BaseComponent();
    this.container = new BaseComponent({ classNames: ['container'] }, this.title, this.pageNumberNode);
    this.pageNumber = 1;
    this.limit = 7;
    this.renderGaragePage();
  }

  renderGaragePage() {
    this.append(this.container);
    this.setTotalNumberCars();
    this.setPageNumber();
  }

  async setTotalNumberCars() {
    const totalNumberCars = await Api.getCars(this.pageNumber, this.limit);
    const titleInner = `Garage (${totalNumberCars})`;
    this.title.setTextContent(titleInner);
  }

  setPageNumber() {
    const pageNumber = 1;
    const pageNumberContent = `Page #${pageNumber}`;
    this.pageNumberNode.setTextContent(pageNumberContent);
  }
}
