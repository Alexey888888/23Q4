import Router from './router';

class App {
  private router: Router;

  constructor() {
    this.router = new Router();
  }

  public start(): void {
    this.router.route();
  }
}

const app = new App();
export default app;
