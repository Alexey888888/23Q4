import carBrands from '../components/view/garage/carBrands';
import Button from '../components/button/button';

export default class Utils {
  static getRandomValue(maxValue: number) {
    return Math.floor(Math.random() * maxValue);
  }

  static getRandomColor(): string {
    const colorPaletteNum = 256;
    const getColorChannel = (): number => this.getRandomValue(colorPaletteNum);
    const toHex = (color: number): string => {
      return color.toString(16).padStart(2, '0');
    };
    return `#${toHex(getColorChannel())}${toHex(getColorChannel())}${toHex(getColorChannel())}`;
  }

  static getRandomCarName(): string {
    const carNames = Object.keys(carBrands);
    const randomCarNameIndex = this.getRandomValue(carNames.length);
    const randomCarName = carNames[randomCarNameIndex];
    const randomCarModelIndex = this.getRandomValue(carBrands[randomCarName].length);
    const randomCarModel = carBrands[randomCarName][randomCarModelIndex];
    return `${randomCarName} ${randomCarModel}`;
  }

  static createSvg(svgInner: string, svgWidth: string, svgHeight: string): SVGElement {
    const svg = 'http://www.w3.org/2000/svg';
    const svgElement = document.createElementNS(svg, 'svg');
    svgElement.setAttributeNS(null, 'width', svgWidth);
    svgElement.setAttributeNS(null, 'height', svgHeight);
    svgElement.setAttributeNS(null, 'class', 'car-svg');
    svgElement.innerHTML = svgInner;
    return svgElement;
  }

  static ButtonsStateToggle(button_1: Button, button_2: Button) {
    button_1.toggleClass('button_disabled');
    button_2.toggleClass('button_disabled');
    if ((button_1.getNode() as HTMLButtonElement).disabled) {
      button_1.setDisabled(false);
    } else button_1.setDisabled(true);
    if ((button_2.getNode() as HTMLButtonElement).disabled) {
      button_2.setDisabled(false);
    } else button_2.setDisabled(true);
  }
}
