import { Controller, View, NewsData, SourcesData } from '../../types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  controller: Controller;
  view: View;
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    const sources = document.querySelector('.sources');
    if (sources === null) throw new Error();
    sources.addEventListener('click', (e) =>
      this.controller.getNews(e, (data: { articles: NewsData[] }) => this.view.drawNews(data)),
    );
    this.controller.getSources((data: { sources: SourcesData[] }) => this.view.drawSources(data));
  }
}

export default App;
