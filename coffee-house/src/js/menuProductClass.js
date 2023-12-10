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
    this.modalTemplate = `<div class="modal">
  <div class="modal__wrapper">
    <div class="modal__images">
      <img src="${this.img}"
      alt="${this.name}">
    </div>
    <div class="modal__description">
      <div>
        <h3 class="modal__title">${this.name}</h3>
        <p class="modal__text">
        ${this.description}
        </p>
      </div>
      <div>
        <p>Size</p>
        <div class="modal__size-buttons">
          <button class="btn btn-modal__size" disabled>
            <span>S</span>
            200 ml
          </button>
          <button class="btn btn-modal__size">
            <span>M</span>
            300 ml
          </button>
          <button class="btn btn-modal__size">
            <span>L</span>
            400 ml
          </button>
        </div>
      </div>
      <div>
        <p>Additives</p>
        <div class="modal__additives-buttons">
          <button class="btn btn-modal__additives">
            <span>1</span>
            Sugar
          </button>
          <button class="btn btn-modal__additives">
            <span>2</span>
            Cinnamon
          </button>
          <button class="btn btn-modal__additives">
            <span>3</span>
            Syrup
          </button>
        </div>
      </div>
      <div class="modal__total-price">
        <h3>Total:</h3>
        <h3>$${this.price}</h3>
      </div>
      <div class="modal__alert">
        <div class="alert__info-icon">
          <img src="../src/img/svg/info-empty.svg" alt="info-empty" />
        </div>
        <p class="text-caption">
          The cost is not final. Download our mobile app to see the final
          price and place your order. Earn loyalty points and enjoy your
          favorite coffee with up to 20% discount.
        </p>
      </div>
      <button class="btn btn_close">
        <p>Close</p>
      </button>
    </div>
  </div>
</div>`;
  }
}
