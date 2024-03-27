export default class Utils {
  static getRandomColor(): string {
    const getColorChannel = (): number => Math.floor(Math.random() * 256);
    const toHex = (color: number): string => {
      return color.toString(16).padStart(2, '0');
    };
    return `#${toHex(getColorChannel())}${toHex(getColorChannel())}${toHex(getColorChannel())}`;
  }
}
