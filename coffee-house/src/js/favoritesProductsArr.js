export const favoritesProductsArr = [
  {
    id: 0,
    img: './src/img/png/coffee-slider-1.png',
    title: 'S&rsquo;mores Frappuccino',
    description:
      'This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.',
    price: '$5.50',
  },
  {
    id: 0,
    img: './src/img/png/coffee-slider-2.png',
    title: 'Caramel Macchiato',
    description:
      'Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.',
    price: '$5.00',
  },
  {
    id: 0,
    img: './src/img/png/coffee-slider-3.png',
    title: 'Ice coffee',
    description:
      'A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.',
    price: '$4.50',
  },
];

export class SliderItem {
  constructor(img, title, description, price) {
    this.img = img;
    this.title = title;
    this.description = description;
    this.price = price;
    this.template = `<div class="slider-favorite__item">
        <img
          class="slider-favorite-item__img"
          src="${this.img}"
          alt="${this.title}"
        >
        <div class="slider-favorite-item__description">
          <h3>${this.title}</h3>
          <p>${this.description}
          </p>
          <p class="price">${this.price}</p>
        </div>
      </div>`;
  }
}
