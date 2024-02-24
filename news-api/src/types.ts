export interface SourcesData {
  name: string;
  id: string;
}

export interface NewsData {
  urlToImage: string;
  author: string;
  source: { name: string };
  publishedAt: string;
  title: string;
  description: string;
  url: string;
}

export type Callback<Data> = (data: Data) => void;

export interface NewsInterface {
  draw(data: NewsData[]): void;
}

export interface SourcesInterface {
  draw(data: SourcesData[]): void;
}

export interface Controller {
  getSources<Data>(callback: Callback<Data>): void;
  getNews<Data>(e: Event, callback: Callback<Data>): void;
}

export interface View {
  news: NewsInterface;
  sources: SourcesInterface;
  drawNews(data: { articles: NewsData[] }): void;
  drawSources(data: { sources: SourcesData[] }): void;
}
