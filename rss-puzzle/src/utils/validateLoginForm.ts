export default class InputValidator {
  static isNotEmptyString(string: string): boolean {
    return string.trim() !== '';
  }

  static isEnglishAbc(text: string): boolean {
    const englishAbc = /^[a-zA-Z]*-?[a-zA-Z]*$/;
    return englishAbc.test(text);
  }

  static isFirstLetterUppercase(text: string): boolean {
    const englishAbc = /^[A-Z]/;
    return englishAbc.test(text);
  }
}
