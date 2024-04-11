import BaseComponent from './components/baseComponent';
import AboutPage from './view/aboutPage';
import Error404Page from './view/error404Page';
import LoginPage from './view/loginPage';
import MainPage from './view/mainPage';

interface RouteHandler {
  (): BaseComponent;
}

export default class Router {
  private routes: { [key: string]: RouteHandler };

  private currentPage: BaseComponent | null;

  constructor() {
    this.routes = {};
    this.initRoutes();
    this.handlePopstate();
    this.currentPage = null;
  }

  private initRoutes(): void {
    this.routes['/login'] = () => new LoginPage(this).render();
    this.routes['/main'] = new MainPage().render;
    this.routes['/about'] = new AboutPage().render;
  }

  public route(): void {
    if (this.currentPage) {
      this.currentPage.destroy();
    }
    let path = window.location.pathname;
    if (path === '/') {
      path = '/login';
      window.history.pushState({}, '', path);
    }
    const handleRoute = this.routes[path];

    if (!handleRoute) {
      this.currentPage = new Error404Page().render();
    } else {
      this.currentPage = handleRoute();
    }
  }

  public routeTo(path: string) {
    window.history.pushState({}, '', path);
    this.route();
  }

  private handlePopstate() {
    window.addEventListener('popstate', () => {
      this.route();
    });
  }
}
