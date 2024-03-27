import './garage.scss';

import BaseComponent from '../../baseComponent';
import { Api, CarObjProps } from '../../../api/api';
import getCarSvg from './carSvg';
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

  carNameUpdateInput: Input;

  carColorUpdateInput: Input;

  carBox: BaseComponent;

  currentCarId: number | null;

  constructor() {
    super({ classNames: ['garage'] });
    this.title = new BaseComponent();
    this.pageNumberNode = new BaseComponent();
    this.container = new BaseComponent({ classNames: ['container'] });
    this.pageNumber = 1;
    this.limit = 7;
    this.currentCarId = null;
    this.garageControl = new BaseComponent();
    this.createButton = new Button({ text: 'CREATE ', attribute: 'type', value: 'submit' });
    this.updateButton = new Button({
      classNames: ['button', 'button_disabled'],
      text: 'UPDATE',
      attribute: 'type',
      value: 'submit',
      disabled: true,
    });
    this.carNameInput = new Input({ name: 'car-name' });
    this.carColorInput = new Input({ name: 'car-color', type: 'color' });
    this.carNameUpdateInput = new Input({ name: 'car-name-update', disabled: true });
    this.carColorUpdateInput = new Input({ name: 'car-color-update', type: 'color', disabled: true });
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
        new Button({ text: 'SELECT', onClick: () => this.selectCar(carId) }),
        new Button({ text: 'REMOVE', onClick: () => this.removeCar(carId) }),
        new BaseComponent({ classNames: ['car-name'], text: car.name }),
      ),
    );
    const { color } = car;
    carNode.getNode().insertAdjacentHTML('beforeend', getCarSvg(color));
    this.carBox.append(carNode);
  }

  renderGarageControl() {
    this.garageControl.appendChildren([
      new Form(
        { classNames: ['garage-control__row'], onSubmit: this.createCar.bind(this) },
        this.carNameInput,
        this.carColorInput,
        this.createButton,
      ),
      new Form(
        { classNames: ['garage-control__row'], onSubmit: this.updateCar.bind(this) },
        this.carNameUpdateInput,
        this.carColorUpdateInput,
        this.updateButton,
      ),
    ]);
    this.container.append(this.garageControl);
  }

  renderCarBox() {
    this.container.append(this.carBox);
  }

  async createCar(event: Event) {
    event.preventDefault();
    const carName = this.carNameInput.getNode().value;
    const carColor = this.carColorInput.getNode().value;
    await Api.createCar(carName, carColor);
    this.carNameInput.getNode().value = '';
    this.carBox.destroyChildren();
    this.setTotalNumberCarsAndRenderCars();
  }

  async updateCar(event: Event) {
    event.preventDefault();
    const carName = this.carNameUpdateInput.getNode().value;
    const carColor = this.carColorUpdateInput.getNode().value;
    await Api.updateCar(this.currentCarId as number, carName, carColor);
    this.carNameUpdateInput.getNode().value = '';
    this.carBox.destroyChildren();
    this.setTotalNumberCarsAndRenderCars();
    this.updateFormDisable();
  }

  async removeCar(carId: number) {
    await Api.deleteCar(carId);
    this.carBox.destroyChildren();
    this.setTotalNumberCarsAndRenderCars();
  }

  selectCar(carId: number) {
    this.currentCarId = carId;
    this.updateButton.removeClass('button_disabled');
    this.updateButton.setDisabled(false);
    this.carNameUpdateInput.setDisabled(false);
    this.carColorUpdateInput.setDisabled(false);
    this.carNameUpdateInput.getNode().focus();
    this.inputCarDataToForm();
  }

  async inputCarDataToForm() {
    if (this.currentCarId) {
      const carObj = await Api.getCar(this.currentCarId);
      this.carNameUpdateInput.getNode().value = carObj.name;
      this.carColorUpdateInput.getNode().value = carObj.color;
    }
  }

  updateFormDisable() {
    const defaultColor = '#000000';
    this.updateButton.addClass(['button_disabled']);
    this.updateButton.setDisabled(true);
    this.carNameUpdateInput.setDisabled(true);
    this.carColorUpdateInput.setDisabled(true);
    this.carColorUpdateInput.getNode().value = defaultColor;
  }
}
