export interface ISources {
  name: string;
  id: number;
}

export interface INews {
  urlToImage: string;
  author: string;
  source: { name: string };
  publishedAt: string;
  title: string;
  description: string;
  url: string;
}
