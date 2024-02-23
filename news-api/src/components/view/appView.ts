import { NewsData } from '../../types';
import { SourcesData } from '../../types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  news: News;
  sources: Sources;
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: { articles: NewsData[] }): void {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: { sources: SourcesData[] }): void {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
