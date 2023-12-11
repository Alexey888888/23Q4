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
      openModal(event);
      closeClickModalHandler();
    }
  });
}

function openModal(event) {
  const targetProduct =
    event.target.closest('.menu-offer').children[1].children[0].children[0]
      .innerHTML;
  allProducts.forEach((product) => {
    if (product.name === targetProduct) {
      const modal = new Product(
        product.img,
        product.name,
        product.description,
        product.price,
        product.sizes.s.size,
        product.sizes.m.size,
        product.sizes.l.size,
        product.additives[0].name,
        product.additives[1].name,
        product.additives[2].name,
        product.sizes.s['add-price'],
        product.sizes.m['add-price'],
        product.sizes.l['add-price'],
        product.additives[0]['add-price'],
        product.additives[1]['add-price'],
        product.additives[2]['add-price']
      );
      body.insertAdjacentHTML('afterbegin', modal.modalTemplate);
      backdrop.classList.add('backdrop_active');
      body.classList.add('scroll-lock');
      addPriceHandler(modal, targetProduct);
    }
  });
}

function closeClickModalHandler() {
  backdrop.addEventListener('click', closeModal);
  document.querySelector('.btn_close').addEventListener('click', closeModal);
}

function closeModal() {
  document.querySelector('.modal').remove();
  body.classList.remove('scroll-lock');
  backdrop.classList.remove('backdrop_active');
}

function addPriceHandler(modal, targetProduct) {
  document.querySelectorAll('.btn-modal__size').forEach((btn) => {
    btn.addEventListener('click', () => {
      sizeButtonSwitcher(btn);
      addPrice(modal, targetProduct);
    });
  });
  document.querySelectorAll('.btn-modal__additives').forEach((btn) => {
    btn.addEventListener('click', () => {
      additivesButtonSwitcher(btn);
      addPrice(modal);
    });
  });
}

function sizeButtonSwitcher(btn) {
  document.querySelectorAll('.btn-modal__size').forEach((item) => {
    item.disabled = false;
  });
  btn.disabled = true;
}

function additivesButtonSwitcher(btn) {
  btn.classList.toggle('btn-modal__additives_active');
}

function addPrice(modal, targetProduct) {
  allProducts.forEach((product) => {
    if (product.name === targetProduct) {
      modal.price = product.price;
    }
  });
  document.querySelectorAll('.btn-modal__size').forEach((item) => {
    if (item.disabled === true) {
      modal.price = +modal.price + +modal[item.id];
    }
    document.querySelector(
      '.modal__current-price'
    ).textContent = `$${modal.price}`;
  });
}
