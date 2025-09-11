import { getParam } from "/js/utils.mjs";
import ProductData from "/js/ProductData.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();