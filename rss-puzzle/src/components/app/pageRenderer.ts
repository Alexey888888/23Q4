import LoginForm from '../view/login-form/loginForm';
import StartScreen from '../view/start-screen/startScreen';

export default class PageRenderer {
  public static renderLoginForm() {
    const loginForm = new LoginForm();
    document.body.append(loginForm.getNode());
  }

  public static renderStartScreen() {
    const startScreen = new StartScreen();
    document.body.append(startScreen.getNode());
  }
}
