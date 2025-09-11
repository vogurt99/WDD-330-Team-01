import ProductList from "./ProductList.mjs";
import ProductData from "./productdata.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector("#product-list");
const productList = new ProductList("tents", dataSource, listElement);

productList.init();