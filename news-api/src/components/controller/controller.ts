import AppLoader from './appLoader';
import { Callback } from '../service/types';
import { isDefined } from '../service/functions';

class AppController extends AppLoader {
  getSources<Data>(callback: Callback<Data>) {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback,
    );
  }

  getNews<Data>(e: Event, callback: Callback<Data>) {
    let target = e.target;
    const newsContainer = isDefined(e.currentTarget);
    if (!(newsContainer instanceof HTMLElement)) throw new Error(`Invalid type for ${newsContainer}`);

    while (target !== newsContainer) {
      isDefined(target);
      if (!(target instanceof HTMLElement)) throw new Error(`Invalid type for ${target}`);
      if (target.classList.contains('source__item')) {
        const sourceId: string = isDefined(target.getAttribute('data-source-id'));
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
