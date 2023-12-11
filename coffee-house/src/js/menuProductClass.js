export class Product {
  constructor(
    img,
    name,
    description,
    price,
    sizeS,
    sizeM,
    sizeL,
    additives1,
    additives2,
    additives3,
    addPriceSizeS,
    addPriceSizeM,
    addPriceSizeL,
    addPriceAdditive1,
    addPriceAdditive2,
    addPriceAdditive3
  ) {
    this.img = img;
    this.name = name;
    this.description = description;
    this.price = price;
    this.sizeS = sizeS;
    this.sizeM = sizeM;
    this.sizeL = sizeL;
    this.additives1 = additives1;
    this.additives2 = additives2;
    this.additives3 = additives3;
    this.addPriceSizeS = addPriceSizeS;
    this.addPriceSizeM = addPriceSizeM;
    this.addPriceSizeL = addPriceSizeL;
    this.addPriceAdditive1 = addPriceAdditive1;
    this.addPriceAdditive2 = addPriceAdditive2;
    this.addPriceAdditive3 = addPriceAdditive3;
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
          <button class="btn btn-modal__size" disabled id="addPriceSizeS">
            <span>S</span>
            ${this.sizeS}
          </button>
          <button class="btn btn-modal__size" id="addPriceSizeM">
            <span>M</span>
            ${this.sizeM}
          </button>
          <button class="btn btn-modal__size" id="addPriceSizeL">
            <span>L</span>
            ${this.sizeL}
          </button>
        </div>
      </div>
      <div>
        <p>Additives</p>
        <div class="modal__additives-buttons">
          <button class="btn btn-modal__additives" id="addPriceAdditive1">
            <span>1</span>
            ${this.additives1}
          </button>
          <button class="btn btn-modal__additives" id="addPriceAdditive2">
            <span>2</span>
            ${this.additives2}
          </button>
          <button class="btn btn-modal__additives" id="addPriceAdditive3">
            <span>3</span>
            ${this.additives3}
          </button>
        </div>
      </div>
      <div class="modal__total-price">
        <h3>Total:</h3>
        <h3 class="modal__current-price">$${this.price}</h3>
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
