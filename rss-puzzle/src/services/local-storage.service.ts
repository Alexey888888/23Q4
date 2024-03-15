export class LocaleStorageService {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  public saveData(data: string): void {
    localStorage.setItem(this.storageKey, data);
  }

  public checkData(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  public clearData(): void {
    localStorage.removeItem(this.storageKey);
  }
}

export const userName = new LocaleStorageService('userNamePuzzleGame888');
export const userSurname = new LocaleStorageService('userSurnamePuzzleGame888');
