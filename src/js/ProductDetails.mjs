import { getParam } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
  }

  async init() {
    const product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails(product);
  }

  renderProductDetails(product) {
    const productDetailsElement = document.querySelector('.product-detail');
    if (productDetailsElement) {
      productDetailsElement.innerHTML = this.buildProductDetailsTemplate(product);
    }
  }

  buildProductDetailsTemplate(product) {
    return `<section class="product-detail">
      <h3>${product.Brand.Name}</h3>
      <h2 class="product-card__name">${product.Name}</h2>
      <img
        class="product-card__image"
        src="/images/tents/${product.Image.split('/').pop()}"
        alt="Image of ${product.Name}"
      />
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">${product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add-to-cart">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>`;
  }
}
