import allProducts from './products.json' assert { type: 'json' };
import { Product } from './menuProductClass.js';

const buttons = document.querySelectorAll('.btn-tab-item');
const offerList = document.querySelector('.menu__offer-list');
const refreshButton = document.querySelector('.menu__btn-refresh');

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
  refreshButton.classList.remove('menu__btn_visible');
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
  if (window.screen.width < 768) {
    for (let i = 4; i < document.querySelectorAll('.menu-offer').length; i++) {
      document
        .querySelectorAll('.menu-offer')
        [i].classList.add('menu-offer_hidden');
    }
  }
  addRefreshButton(category);
}

function addRefreshButton(category) {
  const count = allProducts.reduce((sum, item) => {
    if (item.category === category) sum++;
    return sum;
  }, 0);

  if (window.screen.width < 768 && count > 4) {
    refreshButton.classList.add('menu__btn_visible');
  }
}

function resize() {
  window.addEventListener('resize', () => {
    console.log(window.screen.width);
  });
}

resize();
