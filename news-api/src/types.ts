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
