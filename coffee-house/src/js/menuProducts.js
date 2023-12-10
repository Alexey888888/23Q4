import allProducts from './products.json' assert { type: 'json' };
import { Product } from './menuProductClass.js';

const buttons = document.querySelectorAll('.btn-tab-item');
const offerList = document.querySelector('.menu__offer-list');
const refreshButton = document.querySelector('.menu__btn-refresh');
const body = document.querySelector('body');
const backdrop = document.querySelector('.backdrop');

//let offers = null;

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
  // offers = document.querySelectorAll('.menu-offer');
  // cardClickHandler();
  if (window.screen.width <= 768) {
    for (let i = 4; i < document.querySelectorAll('.menu-offer').length; i++) {
      document
        .querySelectorAll('.menu-offer')
        [i].classList.add('menu-offer_hidden');
    }
    addRefreshButton(category);
  }
}

function addRefreshButton(category) {
  const count = allProducts.reduce((sum, item) => {
    if (item.category === category) sum++;
    return sum;
  }, 0);

  if (window.screen.width <= 768 && count > 4) {
    refreshButton.classList.add('menu__btn_visible');
  }
}

function resize() {
  window.addEventListener('resize', () => {
    if (window.screen.width > 768) {
      document.querySelectorAll('.menu-offer').forEach((offer) => {
        offer.classList.remove('menu-offer_hidden');
      });
      refreshButton.classList.remove('menu__btn_visible');
    } else {
      for (
        let i = 4;
        i < document.querySelectorAll('.menu-offer').length;
        i++
      ) {
        document
          .querySelectorAll('.menu-offer')
          [i].classList.add('menu-offer_hidden');
      }
      if (document.querySelectorAll('.menu-offer').length > 4) {
        refreshButton.classList.add('menu__btn_visible');
      }
    }
  });
}

resize();

function refreshButtonHandler() {
  refreshButton.addEventListener('click', () => {
    document.querySelectorAll('.menu-offer').forEach((offer) => {
      offer.classList.remove('menu-offer_hidden');
    });
    refreshButton.classList.remove('menu__btn_visible');
  });
}

refreshButtonHandler();

//---MODAL---

cardClickHandler();

function cardClickHandler() {
  document.addEventListener('click', (event) => {
    if (event.target.closest('.menu-offer')) {
      const targetProduct =
        event.target.closest('.menu-offer').children[1].children[0].children[0]
          .innerHTML;
      allProducts.forEach((product) => {
        if (product.name === targetProduct) {
          const modal = new Product(
            product.img,
            product.name,
            product.description,
            product.price
          );
          body.insertAdjacentHTML('afterbegin', modal.modalTemplate);
          backdrop.classList.add('backdrop_active');
          body.classList.add('scroll-lock');
          const modalNode = document.querySelector('.modal');
          backdrop.addEventListener('click', () => {
            modalNode.remove();
            body.classList.remove('scroll-lock');
            backdrop.classList.remove('backdrop_active');
          });
          document.querySelector('.btn_close').addEventListener('click', () => {
            modalNode.remove();
            body.classList.remove('scroll-lock');
            backdrop.classList.remove('backdrop_active');
          });
        }
      });
    }
  });
}
