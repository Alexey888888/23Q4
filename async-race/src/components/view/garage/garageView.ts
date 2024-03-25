import './garage.scss';

import BaseComponent from '../../baseComponent';
import { Api, CarObjProps } from '../../../api/api';
import carSvg from './carSvg';

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
    this.setTotalNumberCarsAndRenderCars();
    this.setPageNumber();
  }

  async setTotalNumberCarsAndRenderCars() {
    const { totalNumberCars, carsArr } = await Api.getCars(this.pageNumber, this.limit);
    const titleInner = `Garage (${totalNumberCars})`;
    this.title.setTextContent(titleInner);
    carsArr.forEach((car) => this.renderCar(car));
  }

  setPageNumber() {
    const pageNumber = 1;
    const pageNumberContent = `Page #${pageNumber}`;
    this.pageNumberNode.setTextContent(pageNumberContent);
  }

  renderCar(car: CarObjProps) {
    const carNode = new BaseComponent({ classNames: ['garage__car'] });
    carNode.getNode().insertAdjacentHTML('beforeend', carSvg);
    this.container.append(carNode);
    console.log(car);
  }
}
