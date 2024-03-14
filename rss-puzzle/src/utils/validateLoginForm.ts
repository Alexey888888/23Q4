export default class InputValidator {
  static validateName(name: string): boolean {
    return name.trim() !== '';
  }

  static validateSurname(surname: string): boolean {
    return surname.trim() !== '';
  }
}
