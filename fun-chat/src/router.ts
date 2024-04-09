import AboutPage from './view/aboutPage';
import Error404Page from './view/error404Page';
import LoginPage from './view/loginPage';
import MainPage from './view/mainPage';

interface RouteHandler {
  (): void;
}

export default class Router {
  private routes: { [key: string]: RouteHandler };

  constructor() {
    this.routes = {};
    this.initRoutes();
  }

  private initRoutes(): void {
    this.routes['/login'] = new LoginPage().render;
    this.routes['/main'] = new MainPage().render;
    this.routes['/about'] = new AboutPage().render;
    this.routes['/'] = () => {
      this.routeTo('/login');
      new LoginPage().render();
    };
  }

  public route(): void {
    const path = window.location.pathname;
    const handleRoute = this.routes[path];

    if (!handleRoute) {
      new Error404Page().render();
    } else {
      handleRoute();
    }
  }

  public routeTo(path: string) {
    window.history.pushState({}, '', path);
    this.route();
  }
}
