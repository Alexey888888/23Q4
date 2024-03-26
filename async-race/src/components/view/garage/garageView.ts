import './garage.scss';

import BaseComponent from '../../baseComponent';
import { Api, CarObjProps } from '../../../api/api';
import carSvg from './carSvg';
import Button from '../../button/button';
import Input from '../../input/input';
import Form from '../../form/form';

export default class GarageView extends BaseComponent {
  container: BaseComponent;

  title: BaseComponent;

  pageNumberNode: BaseComponent;

  pageNumber: number;

  limit: number;

  garageControl: BaseComponent;

  carNameInput: Input;

  carColorInput: Input;

  createButton: Button;

  updateButton: Button;

  carBox: BaseComponent;

  constructor() {
    super({ classNames: ['garage'] });
    this.title = new BaseComponent();
    this.pageNumberNode = new BaseComponent();
    this.container = new BaseComponent({ classNames: ['container'] });
    this.pageNumber = 1;
    this.limit = 7;
    this.garageControl = new BaseComponent();
    this.createButton = new Button({ text: 'CREATE ', attribute: 'type', value: 'submit' });
    this.updateButton = new Button({ text: 'UPDATE' });
    this.carNameInput = new Input({ name: 'car-name' });
    this.carColorInput = new Input({ name: 'car-color', type: 'color' });
    this.carBox = new BaseComponent();
    this.renderGaragePage();
  }

  renderGaragePage() {
    this.append(this.container);
    this.renderGarageControl();
    this.renderTitle();
    this.renderCarBox();
    this.setTotalNumberCarsAndRenderCars();
    this.setPageNumber();
  }

  renderTitle() {
    this.container.appendChildren([this.title, this.pageNumberNode]);
  }

  async setTotalNumberCarsAndRenderCars() {
    const { totalNumberCars, carsArr } = await Api.getCars(this.pageNumber, this.limit);
    const titleInner = `Garage (${totalNumberCars})`;
    this.title.setTextContent(titleInner);
    carsArr.forEach((car) => this.renderCarNode(car));
  }

  setPageNumber() {
    const pageNumber = 1;
    const pageNumberContent = `Page #${pageNumber}`;
    this.pageNumberNode.setTextContent(pageNumberContent);
  }

  renderCarNode(car: CarObjProps) {
    const carId = car.id;
    const carNode: BaseComponent = new BaseComponent(
      { classNames: ['car__node'] },
      new BaseComponent(
        { classNames: ['car-node__top'] },
        new Button({ text: 'SELECT' }),
        new Button({ text: 'REMOVE', onClick: () => this.removeCar(carId) }),
        new BaseComponent({ classNames: ['car-name'], text: car.name }),
      ),
    );
    carNode.getNode().insertAdjacentHTML('beforeend', carSvg);
    this.carBox.append(carNode);
    console.log(car);
  }

  renderGarageControl() {
    this.garageControl.append(
      new Form(
        { classNames: ['garage-control__row'], onSubmit: this.createCar.bind(this) },
        this.carNameInput,
        this.carColorInput,
        this.createButton,
      ),
    );
    this.container.append(this.garageControl);
  }

  renderCarBox() {
    this.container.append(this.carBox);
  }

  createCar(event: Event) {
    event.preventDefault();
    const carName = this.carNameInput.getNode().value;
    const carColor = this.carNameInput.getNode().value;
    Api.createCar(carName, carColor);
    (event.target as HTMLFormElement).reset();
    this.carBox.getNode().innerHTML = '';
    this.setTotalNumberCarsAndRenderCars();
  }

  async removeCar(carId: number) {
    await Api.deleteCar(carId);
    this.carBox.destroyChildren();
    this.setTotalNumberCarsAndRenderCars();
  }
}
