import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      if (this.product && this.product.Id) { // Check for a valid product
        await this.renderProductDetails(this.product); // await here
        document
          .getElementById("addToCart")
          .addEventListener("click", this.addProductToCart.bind(this));
      } else {
        // Handle case where product is not found or is invalid
        console.error("Product not found or invalid product data.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  addProductToCart() {
    let cart = getLocalStorage("so-cart");
    if (!cart) {
      cart = [];
    }
    // Check if product is already in cart
    const existingProduct = cart.find(item => item.Id === this.product.Id);
    if (existingProduct) {
      existingProduct.Quantity++;
    } else {
      this.product.Quantity = 1;
      cart.push(this.product);
    }
    setLocalStorage("so-cart", cart);
  }

  async renderProductDetails(product) { // async here
    const productDetailsElement = document.querySelector(".product-detail");
    if (productDetailsElement) {
      productDetailsElement.innerHTML = await this.buildProductDetailsTemplate(product); // await here
    }
  }

  async buildProductDetailsTemplate(product) {

    return `
      <h3>${product.Brand.Name}</h3>
      <h2 class="product-card__name">${product.Name}</h2>
      <img
        class="product-card__image"
        src="${product.Images.PrimaryLarge}"
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