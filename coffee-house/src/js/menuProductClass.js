export class Product {
  constructor(img, name, description, price) {
    this.img = img;
    this.name = name;
    this.description = description;
    this.price = price;
    this.template = `<li class="menu-offer">
    <div class="menu-offer__img-wrapper">
      <img
        class="menu-offer__img"
        src="${this.img}"
        alt="${this.name}"
      />
    </div>
    <div class="menu-offer__description">
      <div>
        <h3>${this.name}</h3>
        <p>${this.description}</p>
      </div>
      <h3>$${this.price}</h3>
    </div>
  </li>`;
  }
}
