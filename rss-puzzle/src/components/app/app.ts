import { LocaleStorageService, userName, userSurname } from '../../services/local-storage.service';
import PageRenderer from './pageRenderer';

class App {
  private userName: LocaleStorageService;

  private userSurname: LocaleStorageService;

  constructor(name: LocaleStorageService, surname: LocaleStorageService) {
    this.userName = name;
    this.userSurname = surname;
  }

  public start() {
    if (this.userName.checkData() && this.userSurname.checkData()) {
      PageRenderer.renderStartScreen();
    } else {
      PageRenderer.renderLoginForm();
    }
  }
}

const app = new App(userName, userSurname);
export default app;
