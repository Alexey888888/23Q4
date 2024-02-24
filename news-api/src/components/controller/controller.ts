import AppLoader from './appLoader';
import { Callback } from '../../types';

class AppController<Data> extends AppLoader {
  getSources(callback: Callback<Data>) {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback,
    );
  }

  getNews<Data>(e: PointerEvent, callback: Callback<Data>) {
    console.log(e);
    let target = e.target;
    const newsContainer = e.currentTarget;
    if (newsContainer === null) throw new Error();
    if (!(newsContainer instanceof HTMLElement)) throw new Error();

    while (target !== newsContainer) {
      if (target === null) throw new Error();
      if (!(target instanceof HTMLElement)) throw new Error();
      if (target.classList.contains('source__item')) {
        const sourceId: string | null = target.getAttribute('data-source-id');
        if (sourceId === null) throw new Error();
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback,
          );
        }
        return;
      }
      target = target.parentNode;
    }
  }
}

export default AppController;
