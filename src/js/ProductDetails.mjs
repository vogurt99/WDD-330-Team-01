import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./ShoppingCart.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      if (this.product && this.product.Id) {
        await this.renderProductDetails(this.product);
        this.updateBreadcrumb();
        document
          .getElementById("addToCart")
          .addEventListener("click", this.addProductToCart.bind(this));
      } else {
        console.error("Product not found or invalid product data.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  addProductToCart() {
    let cart = getLocalStorage("so-cart") || [];

    const existingProduct = cart.find(item => item.Id === this.product.Id);
    if (existingProduct) {
      existingProduct.Quantity++;
    } else {
      const cartItem = {
        Id: this.product.Id,
        Name: this.product.NameWithoutBrand || this.product.Name,
        FinalPrice: this.product.FinalPrice,
        Image: this.product.Images?.PrimaryMedium || this.product.Images?.PrimaryLarge || "",
        Quantity: 1
      };
      cart.push(cartItem);
    }

    setLocalStorage("so-cart", cart);

    updateCartCount();

    const cartIcon = document.querySelector(".cart-icon");
    if (cartIcon) {
      cartIcon.classList.add("cart-animate");
      setTimeout(() => cartIcon.classList.remove("cart-animate"), 400);
    }
  }


  async renderProductDetails(product) {
    const productDetailsElement = document.querySelector(".product-detail");
    if (productDetailsElement) {
      productDetailsElement.innerHTML = await this.buildProductDetailsTemplate(product);
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

  updateBreadcrumb() {
    const breadcrumbElement = document.querySelector('.breadcrumb');
    if (breadcrumbElement && this.product) {
      const categoryName = this.product.Category.charAt(0).toUpperCase() + this.product.Category.slice(1);
      breadcrumbElement.textContent = `${categoryName}`;
    }
  }
}