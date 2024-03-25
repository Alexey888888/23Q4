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
    this.container = new BaseComponent({ classNames: ['container'] }, this.title, this.pageNumberNode);
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
    this.renderCarBox();
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
    const carId = car.id;
    const carNode: BaseComponent = new BaseComponent(
      { classNames: ['garage__car'] },
      new Button({ text: 'REMOVE', onClick: () => this.removeCar(carId, carNode) }),
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
    this.carBox.getNode().innerHTML = '';
    this.setTotalNumberCarsAndRenderCars();
  }

  // eslint-disable-next-line class-methods-use-this
  removeCar(carId: number, carNode: BaseComponent) {
    Api.deleteCar(carId);
    carNode.destroy();
  }
}
