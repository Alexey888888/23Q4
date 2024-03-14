export default class LocaleStorageService {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  public saveData(data: string): void {
    localStorage.setItem(this.storageKey, data);
  }
}

export const userName = new LocaleStorageService('userNamePuzzleGame888');
export const userSurname = new LocaleStorageService('userSurnamePuzzleGame888');
