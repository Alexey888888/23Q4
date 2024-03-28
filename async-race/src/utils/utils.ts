import carBrands from '../components/view/garage/carBrands';

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
}
