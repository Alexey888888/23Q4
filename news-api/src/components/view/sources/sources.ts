import { SourcesData, SourcesInterface } from '../../service/types';
import './sources.css';

class Sources implements SourcesInterface {
  draw(data: SourcesData[]): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
    if (sourceItemTemp === null) throw new Error();

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true);
      if (!(sourceClone instanceof DocumentFragment)) throw new Error();

      const itemName = sourceClone.querySelector('.source__item-name');
      if (itemName === null) throw new Error();
      itemName.textContent = item.name;

      const sourceItem = sourceClone.querySelector('.source__item');
      if (sourceItem === null) throw new Error();
      sourceItem.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    const sources = document.querySelector('.sources');
    if (sources === null) throw new Error();
    sources.append(fragment);
  }
}

export default Sources;
