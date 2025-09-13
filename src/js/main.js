import ProductList from "/js/ProductList.mjs";
import ProductData from "/js/productData.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector("#product-list");
const productList = new ProductList("tents", dataSource, listElement);

productList.init();