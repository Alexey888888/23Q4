import { isDefined } from '../../service/functions';
import { SourcesData, SourcesInterface } from '../../service/types';
import './sources.css';

class Sources implements SourcesInterface {
  public draw(data: SourcesData[]): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement = isDefined(document.querySelector('#sourceItemTemp'));

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true);
      if (!(sourceClone instanceof DocumentFragment)) throw new Error(`Invalid type for ${sourceClone}`);

      const itemName = isDefined(sourceClone.querySelector('.source__item-name'));
      itemName.textContent = item.name;

      const sourceItem = isDefined(sourceClone.querySelector('.source__item'));
      sourceItem.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    const sources = isDefined(document.querySelector('.sources'));
    sources.append(fragment);
  }
}

export default Sources;
