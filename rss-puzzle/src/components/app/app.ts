import LoginForm from '../view/login-form/loginForm';
import { LocaleStorageService, userName, userSurname } from '../../services/local-storage.service';
import StartScreen from '../view/start-screen/startScreen';

class App {
  private userName: LocaleStorageService;

  private userSurname: LocaleStorageService;

  public startScreen: StartScreen;

  private loginForm: LoginForm | null;

  constructor(name: LocaleStorageService, surname: LocaleStorageService) {
    this.userName = name;
    this.userSurname = surname;
    this.startScreen = new StartScreen();
    this.loginForm = null;
  }

  public start() {
    if (this.userName.checkData() && this.userSurname.checkData()) {
      this.startScreen = new StartScreen();
      document.body.append(this.startScreen.getNode());
    } else {
      this.loginForm = new LoginForm();
      document.body.append(this.loginForm.getNode());
    }
  }
}

const app = new App(userName, userSurname);
export default app;
