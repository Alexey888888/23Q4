import { isDefined } from '../../service/functions';
import { NewsData, NewsInterface } from '../../service/types';
import './news.css';

class News implements NewsInterface {
  draw(data: NewsData[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement = isDefined(document.querySelector('#newsItemTemp'));

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true);
      if (!(newsClone instanceof DocumentFragment)) throw new Error(`Invalid type for ${newsClone}`);

      if (idx % 2) {
        const newsItem = isDefined(newsClone.querySelector('.news__item'));
        newsItem.classList.add('alt');
      }

      const metaPhoto = isDefined(newsClone.querySelector('.news__meta-photo'));
      if (!(metaPhoto instanceof HTMLElement)) throw new Error(`Invalid type for ${metaPhoto}`);
      metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

      const metaAuthor = isDefined(newsClone.querySelector('.news__meta-author'));
      metaAuthor.textContent = item.author || item.source.name;

      const metaDate = isDefined(newsClone.querySelector('.news__meta-date'));
      metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

      const descriptionTitle = isDefined(newsClone.querySelector('.news__description-title'));
      descriptionTitle.textContent = item.title;

      const descriptionSource = isDefined(newsClone.querySelector('.news__description-source'));
      descriptionSource.textContent = item.source.name;

      const descriptionContent = isDefined(newsClone.querySelector('.news__description-content'));
      descriptionContent.textContent = item.description;

      const readMore = isDefined(newsClone.querySelector('.news__read-more a'));
      readMore.setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    const documentNews = isDefined(document.querySelector('.news'));
    documentNews.innerHTML = '';
    documentNews.appendChild(fragment);
  }
}

export default News;
