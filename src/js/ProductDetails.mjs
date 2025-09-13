import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    if (this.product) {
      this.renderProductDetails(this.product);
      document
        .getElementById("addToCart")
        .addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    let cart = getLocalStorage("so-cart");
    if (!cart) {
      cart = [];
    }
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
  }

  renderProductDetails(product) {
    const productDetailsElement = document.querySelector(".product-detail");
    if (productDetailsElement) {
      productDetailsElement.innerHTML = this.buildProductDetailsTemplate(product);
    }
  }

  buildProductDetailsTemplate(product) {
    return `
      <h3>${product.Brand.Name}</h3>
      <h2 class="product-card__name">${product.Name}</h2>
      <img
        class="product-card__image"
        src="${product.Image.replace("../", "/")}"
        alt="Image of ${product.Name}"
      />
      <p class="product-card__price">${product.FinalPrice}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">${product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add-to-cart">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>`;
  }
}