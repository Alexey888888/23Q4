import AppLoader from './appLoader';
import { Callback } from '../service/types';
import { isDefined } from '../service/functions';
import { Endpoint } from './loader';

class AppController extends AppLoader {
  public getSources<Data>(callback: Callback<Data>) {
    super.getResp(
      {
        endpoint: Endpoint.Sources,
      },
      callback,
    );
  }

  public getNews<Data>(e: Event, callback: Callback<Data>) {
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
              endpoint: Endpoint.Everything,
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
