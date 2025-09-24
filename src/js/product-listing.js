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
