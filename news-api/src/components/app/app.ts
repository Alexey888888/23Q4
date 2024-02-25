import { Controller, View, NewsData, SourcesData } from '../service/types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { isDefined } from '../service/functions';

class App {
  controller: Controller;
  view: View;
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start() {
    const sources = isDefined(document.querySelector('.sources'));
    sources.addEventListener('click', (e) =>
      this.controller.getNews(e, (data: { articles: NewsData[] }) => this.view.drawNews(data)),
    );
    this.controller.getSources((data: { sources: SourcesData[] }) => this.view.drawSources(data));
  }
}

export default App;
