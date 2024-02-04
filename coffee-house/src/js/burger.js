const burger = document.querySelector('.button-icon-burger');
const menu = document.querySelector('.header__nav');
const body = document.querySelector('body');
const burgerLinks = document.querySelectorAll('.nav__link');
const menuLink = document.querySelector('.menu-link-line');
const lineTop = document.querySelector('.button-icon-burger__line-top');
const lineBottom = document.querySelector('.button-icon-burger__line-bottom');

clickHandler();
setDelayLink();

function clickHandler() {
  burger.addEventListener('click', toggleBurger);
  menuLink.addEventListener('click', closeBurger);
  burgerLinks.forEach((link) => {
    link.addEventListener('click', closeBurger);
  });
}

function toggleBurger() {
  menu.classList.toggle('burger__nav_active');
  body.classList.toggle('scroll-lock');
  lineTop.classList.toggle('burger__cross-line-top');
  lineBottom.classList.toggle('burger__cross-line-bottom');
}

function closeBurger() {
  menu.classList.remove('burger__nav_active');
  body.classList.remove('scroll-lock');
  lineTop.classList.remove('burger__cross-line-top');
  lineBottom.classList.remove('burger__cross-line-bottom');
}

function setDelayLink() {
  document.addEventListener('click', (event) => {
    const menuLink = event.target.closest('.menu-link');
    const mainLink = event.target.closest('.nav__link');
    if (menuLink && window.screen.width <= 768) {
      event.preventDefault();
      setTimeout(() => (window.location = menuLink.href), 300);
    }
    if (mainLink && window.screen.width <= 768) {
      event.preventDefault();
      setTimeout(() => (window.location = mainLink.href), 300);
    }
  });
}
