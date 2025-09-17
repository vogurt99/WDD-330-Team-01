import { renderListWithTemplate, qs } from './utils.mjs';

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

    const link = li.querySelector('a');
    const img = li.querySelector('img');
    const name = li.querySelector('.card__name');
    const color = li.querySelector('.cart-card__color');
    const qty = li.querySelector('.cart-card__quantity');
    const price = li.querySelector('.cart-card__price');

    link.href = `../product_pages/index.html?productid=${item.Id}`;
    img.src = item.Image;

    img.alt = `Image of ${item.Name}`;
    name.textContent = item.Name;
    color.textContent = item.Colors?.[0] ?? '';
    qty.textContent = `qty: ${item.Quantity}`;
    price.textContent = `$${item.FinalPrice}`;

    return li.outerHTML;
  }
}