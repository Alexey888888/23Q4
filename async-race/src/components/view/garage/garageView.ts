import './garage.scss';

import BaseComponent from '../../baseComponent';
import { Api, CarObjProps } from '../../../api/api';
import getCarSvg from './carSvg';
import Button from '../../button/button';
import Input from '../../input/input';
import Form from '../../form/form';
import Utils from '../../../utils/utils';

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

  totalNumberCars: number;

  isPagination: boolean;

  paginationNode: BaseComponent;

  prevButton: Button;

  nextButton: Button;

  raceButton: Button;

  resetButton: Button;

  generateCarsButton: Button;

  constructor() {
    super({ classNames: ['garage'] });
    this.title = new BaseComponent({ classNames: ['title'] });
    this.pageNumberNode = new BaseComponent();
    this.container = new BaseComponent({ classNames: ['container'] });
    this.pageNumber = 1;
    this.limit = 7;
    this.currentCarId = null;
    this.totalNumberCars = 0;
    this.isPagination = false;
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
    this.paginationNode = new BaseComponent({ classNames: ['pagination-buttons'] });
    this.prevButton = new Button({ text: 'PREV', onClick: () => this.changePage('prev') });
    this.nextButton = new Button({ text: 'NEXT', onClick: () => this.changePage('next') });
    this.raceButton = new Button({ classNames: ['button', 'race-button'], text: 'RACE' });
    this.resetButton = new Button({ classNames: ['button', 'race-button'], text: 'RESET' });
    this.generateCarsButton = new Button({
      classNames: ['button', 'generate-button'],
      text: 'GENERATE CARS',
      onClick: () => this.generateHundredCars(),
    });
    this.renderGaragePage();
  }

  renderGaragePage() {
    this.append(this.container);
    this.renderGarageControl();
    this.renderTitle();
    this.renderCarBox();
    this.setTotalNumberCarsAndRenderCars();
    this.setPageNumber();
    this.container.append(this.paginationNode);
  }

  renderTitle() {
    this.container.appendChildren([this.title, this.pageNumberNode]);
  }

  async setTotalNumberCarsAndRenderCars() {
    const { totalNumberCars, carsArr } = await Api.getCars(this.pageNumber, this.limit);
    const titleInner = `Garage (${totalNumberCars})`;
    this.title.setTextContent(titleInner);
    carsArr.forEach((car) => this.renderCarNode(car));
    this.totalNumberCars = Number(totalNumberCars);
    this.pagination();
    if (this.carBox.getNode().childNodes.length === 0 && this.pageNumber !== 1) {
      this.pageNumber -= 1;
      this.setPageNumber();
      this.setTotalNumberCarsAndRenderCars();
    }
  }

  setPageNumber() {
    const pageNumberContent = `Page #${this.pageNumber}`;
    this.pageNumberNode.setTextContent(pageNumberContent);
  }

  renderCarNode(car: CarObjProps) {
    const { name, color, id } = car;
    const carName = new BaseComponent({ classNames: ['car-name'], text: car.name });
    carName.getNode().style.color = color;
    if (name) carName.addClass(['car-name-background']);
    const carRow = new BaseComponent(
      { classNames: ['car-row'] },
      new Button({ text: 'START' }),
      new Button({ text: 'STOP' }),
    );
    const carNode: BaseComponent = new BaseComponent(
      { classNames: ['car__node'] },
      new BaseComponent(
        { classNames: ['car-node__top'] },
        new Button({ text: 'SELECT', onClick: () => this.selectCar(id) }),
        new Button({ text: 'REMOVE', onClick: () => this.removeCar(id) }),
        carName,
      ),
      carRow,
    );
    carRow.getNode().insertAdjacentHTML('beforeend', getCarSvg(color));
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
      new BaseComponent(
        { classNames: ['garage-control__row'] },
        this.raceButton,
        this.resetButton,
        this.generateCarsButton,
      ),
    ]);
    this.container.append(this.garageControl);
  }

  renderCarBox() {
    this.container.append(this.carBox);
  }

  async createCar(event?: Event) {
    if (event) event.preventDefault();
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

  pagination() {
    if (this.totalNumberCars > this.limit && !this.isPagination) {
      this.isPagination = true;
      this.paginationNode.appendChildren([this.prevButton, this.nextButton]);
    }
    if (this.totalNumberCars <= this.limit && this.isPagination) {
      this.paginationNode.destroyChildren();
      this.isPagination = false;
    }
    this.setDisablePaginationButton();
  }

  changePage(mode: string) {
    if (mode === 'next') this.pageNumber += 1;
    if (mode === 'prev') this.pageNumber -= 1;
    this.setPageNumber();
    this.carBox.destroyChildren();
    this.setTotalNumberCarsAndRenderCars();
  }

  setDisablePaginationButton() {
    const lastPage = Math.ceil(this.totalNumberCars / this.limit);
    if (this.pageNumber === 1) {
      this.prevButton.setDisabled(true);
      this.prevButton.addClass(['button_disabled']);
    } else {
      this.prevButton.setDisabled(false);
      this.prevButton.removeClass('button_disabled');
    }
    if (this.pageNumber === lastPage) {
      this.nextButton.setDisabled(true);
      this.nextButton.addClass(['button_disabled']);
    } else {
      this.nextButton.setDisabled(false);
      this.nextButton.removeClass('button_disabled');
    }
  }

  generateHundredCars() {
    const carsNum = 100;
    for (let i = 0; i < carsNum; i += 1) {
      Api.createCar(Utils.getRandomCarName(), Utils.getRandomColor());
    }
    this.carBox.destroyChildren();
    this.setTotalNumberCarsAndRenderCars();
  }
}
