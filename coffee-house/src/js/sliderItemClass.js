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
