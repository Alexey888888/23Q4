import { NewsData } from '../../../types';
import './news.css';

class News {
  draw(data: NewsData[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
    if (newsItemTemp === null) throw new Error();

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true);
      if (!(newsClone instanceof DocumentFragment)) throw new Error();

      if (idx % 2) {
        const newsItem = newsClone.querySelector('.news__item');
        if (newsItem === null) throw new Error();
        newsItem.classList.add('alt');
      }

      const metaPhoto = newsClone.querySelector('.news__meta-photo');
      if (metaPhoto === null) throw new Error();
      if (!(metaPhoto instanceof HTMLElement)) throw new Error();
      metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

      const metaAuthor = newsClone.querySelector('.news__meta-author');
      if (metaAuthor === null) throw new Error();
      metaAuthor.textContent = item.author || item.source.name;

      const metaDate = newsClone.querySelector('.news__meta-date');
      if (metaDate === null) throw new Error();
      metaAuthor.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

      const descriptionTitle = newsClone.querySelector('.news__description-title');
      if (descriptionTitle === null) throw new Error();
      descriptionTitle.textContent = item.title;

      const descriptionSource = newsClone.querySelector('.news__description-source');
      if (descriptionSource === null) throw new Error();
      descriptionSource.textContent = item.source.name;

      const descriptionContent = newsClone.querySelector('.news__description-content');
      if (descriptionContent === null) throw new Error();
      descriptionContent.textContent = item.description;

      const readMore = newsClone.querySelector('.news__read-more a');
      if (readMore === null) throw new Error();
      readMore.setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    const documentNews = document.querySelector('.news');
    if (documentNews === null) throw new Error();
    documentNews.innerHTML = '';
    documentNews.appendChild(fragment);
  }
}

export default News;
