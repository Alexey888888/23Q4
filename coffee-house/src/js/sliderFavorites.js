import { favoritesProductsArr, SliderItem } from './favoritesProductsArr.js';

const productList = document.querySelector('.slider-favorite__list');
const btnRight = document.getElementById('slider-favorite__btn_right');
const btnLeft = document.getElementById('slider-favorite__btn_left');
const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);
const controls = document.querySelectorAll('.slider__control');

let startPoint = rootStyles.getPropertyValue('--slider_start-point');
let endPoint = rootStyles.getPropertyValue('--slider_end-point');
let pos = 0;
let productItems = null;
let startTouch = 0;
let endTouch = 0;

clearProductList();
createProductList();
getProductItems();
btnRightHandler();
btnLeftHandler();
sliderAnimationEndHandler();
controlAnimationEndHandler();

function clearProductList() {
  productList.innerHTML = '';
}

function createProductList() {
  for (let i = 0; i < favoritesProductsArr.length; i++) {
    const sliderItem = new SliderItem(
      favoritesProductsArr[i].img,
      favoritesProductsArr[i].title,
      favoritesProductsArr[i].description,
      favoritesProductsArr[i].price
    );
    productList.insertAdjacentHTML('beforeend', sliderItem.template);
  }
}

function btnRightHandler() {
  btnRight.addEventListener('click', moveLeft);
}

function btnLeftHandler() {
  btnLeft.addEventListener('click', moveRight);
}

function moveLeft() {
  changeControl();
  btnRight.removeEventListener('click', moveLeft);
  btnLeft.removeEventListener('click', moveRight);
  if (endPoint === -((favoritesProductsArr.length - 1) * 100)) {
    endPoint = 0;
  } else endPoint = endPoint - 100;
  root.style.setProperty('--slider_end-point', endPoint + '%');
  productList.classList.add('slider-move');
}

function moveRight() {
  reverseChangeControl();
  btnRight.removeEventListener('click', moveLeft);
  btnLeft.removeEventListener('click', moveRight);
  if (+endPoint === 0) {
    endPoint = -((favoritesProductsArr.length - 1) * 100);
  } else endPoint = endPoint + 100;
  root.style.setProperty('--slider_end-point', endPoint + '%');
  productList.classList.add('slider-move');
}

function sliderAnimationEndHandler() {
  productList.addEventListener('animationend', () => {
    btnRight.addEventListener('click', moveLeft);
    btnLeft.addEventListener('click', moveRight);
    productList.classList.add('slider_current-point');
    productList.classList.remove('slider-move');
    startPoint = endPoint;
    root.style.setProperty('--slider_start-point', startPoint + '%');
  });
}

function controlAnimationEndHandler() {
  controls.forEach((control) => {
    control.addEventListener('animationend', () => {
      moveLeft();
    });
  });
}

function changeControl() {
  controls[pos].classList.remove('slider__control_active');
  pos++;
  if (pos > 2) pos = 0;
  controls[pos].classList.add('slider__control_active');
}

function reverseChangeControl() {
  controls[pos].classList.remove('slider__control_active');
  pos--;
  if (pos < 0) pos = 2;
  controls[pos].classList.add('slider__control_active');
}

function getProductItems() {
  productItems = document.querySelectorAll('.slider-favorite__item');
}

function productCursorHandler() {
  productItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      const activeControl = document.querySelector('.slider__control_active');
      activeControl.classList.add('pause');
      //activeControl.classList.remove('continue');
    });
    item.addEventListener('mouseleave', () => {
      const activeControl = document.querySelector('.slider__control_active');
      activeControl.classList.remove('pause');
      //activeControl.classList.add('continue');
    });
  });
}

productCursorHandler();

function productTouchHandler() {
  productItems.forEach(
    (item) => {
      item.addEventListener(
        'touchstart',
        (event) => {
          event.preventDefault();
          const activeControl = document.querySelector(
            '.slider__control_active'
          );
          activeControl.classList.add('pause');
          //activeControl.classList.remove('continue');
          startTouch = event.touches[0].clientX;
        }
        // ,
        // { passive: true }
      );
      item.addEventListener('touchend', (event) => {
        event.preventDefault();
        const activeControl = document.querySelector('.slider__control_active');
        activeControl.classList.remove('pause');
        //activeControl.classList.add('continue');
        endTouch = event.changedTouches[0].clientX;
        if (startTouch - endTouch > 0) {
          moveLeft();
        }
        if (startTouch - endTouch < 0) {
          moveRight();
        }
      });
    }
    // ,
    // { passive: true }
  );
}

productTouchHandler();
