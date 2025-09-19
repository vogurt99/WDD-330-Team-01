import { renderListWithTemplate, qs, getLocalStorage } from './utils.mjs';

export default class ShoppingCart {
  constructor(cartData, listElement) {
    this.cartData = cartData;
    this.listElement = listElement;
  }

  init() {
    this.renderList(this.cartData);
  }

  renderList(list) {
    renderListWithTemplate(this.buildCartItemTemplate, this.listElement, list, 'beforeend', true);
  }

  buildCartItemTemplate(item) {
    const template = qs('#cart').content.cloneNode(true);
    const li = template.querySelector('li');

    const imageLink = li.querySelector('.cart-card__image');
    const img = li.querySelector('img');
    const detailsElement = li.querySelector('.cart-card__details');
    const nameElement = detailsElement.querySelector('.card__name');
    const colorElement = detailsElement.querySelector('.cart-card__color');

    const actionsElement = li.querySelector('.cart-card__actions');
    const qtyElement = actionsElement.querySelector('.cart-card__quantity');
    const priceElement = actionsElement.querySelector('.cart-card__price');

    imageLink.href = `../product_pages/index.html?productid=${item.Id}`;
    img.src = item.Images?.PrimarySmall;
    img.alt = `Image of ${item.Name}`;

    nameElement.textContent = item.Name;
    colorElement.textContent = item.Colors?.[0]?.ColorName ?? '';
    const quantity = item.Quantity || 1;
    qtyElement.textContent = `qty: ${quantity}`;
    priceElement.textContent = `${item.FinalPrice}`;

    return li.outerHTML;
  }

  getCartTotal() {
    return this.cartData.reduce(
      (total, item) => {
        const quantity = item.Quantity || 1;
        return total + parseFloat(item.FinalPrice) * parseInt(quantity, 10)
      },
      0
    );
  }
}

export function updateCartCount() {
    const cartItems = getLocalStorage("so-cart") || [];
    const count = cartItems.reduce((total, item) => total + (item.Quantity || 1), 0);
    const cartCountElement = qs(".cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}