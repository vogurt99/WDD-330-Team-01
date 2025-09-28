import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { qs } from "./utils.mjs";
import { updateCartCount } from "./ShoppingCart.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

const category = getParam("category");
const dataSource = new ExternalServices();
const listElement = qs(".product-list");
const myList = new ProductList(category, dataSource, listElement);

const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
qs(".products h2").textContent += `${capitalizedCategory}`;

loadHeaderFooter().then(() => {
  updateCartCount();
});

myList.init();

const modal = qs("#quick-view-modal");
const closeModal = qs(".close");

closeModal.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

listElement.addEventListener("click", async (event) => {
  if (event.target.matches(".quick-view")) {
    const productId = event.target.dataset.id;
    const product = await dataSource.findProductById(productId);
    const modalProductDetails = qs("#modal-product-details");
    modalProductDetails.innerHTML = `
      <h3>${product.Name}</h3>
      <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
      <p>${product.DescriptionHtmlSimple}</p>
      <p>Price: $${product.FinalPrice}</p>
    `;
    modal.style.display = "block";
  }
});