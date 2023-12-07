import allProducts from './products.json' assert { type: 'json' };
import { Product } from './menuProductClass.js';

const buttons = document.querySelectorAll('.btn-tab-item');
const offerList = document.querySelector('.menu__offer-list');

buttonClickHandler();
renderingOfferList('coffee');

function buttonClickHandler() {
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttonSwitcher(button);
      const category = button.id;
      renderingOfferList(category);
    });
  });
}

function buttonSwitcher(button) {
  buttons.forEach((item) => {
    item.disabled = false;
  });
  button.disabled = true;
}

function renderingOfferList(category) {
  offerList.innerHTML = '';
  allProducts.forEach((item) => {
    if (item.category === category) {
      const product = new Product(
        item.img,
        item.name,
        item.description,
        item.price
      );
      offerList.insertAdjacentHTML('beforeEnd', product.template);
    }
  });
}
