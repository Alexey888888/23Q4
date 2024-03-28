import carBrands from '../components/view/garage/carBrands';

export default class Utils {
  static getRandomColor(): string {
    const getColorChannel = (): number => Math.floor(Math.random() * 256);
    const toHex = (color: number): string => {
      return color.toString(16).padStart(2, '0');
    };
    return `#${toHex(getColorChannel())}${toHex(getColorChannel())}${toHex(getColorChannel())}`;
  }

  static getRandomCarName(): string {
    const carNames = Object.keys(carBrands);
    const randomCarNameIndex = Math.floor(Math.random() * carNames.length);
    const randomCarName = carNames[randomCarNameIndex];
    const randomCarModelIndex = Math.floor(Math.random() * carBrands[randomCarName].length);
    const randomCarModel = carBrands[randomCarName][randomCarModelIndex];
    return `${randomCarName} ${randomCarModel}`;
  }
}
