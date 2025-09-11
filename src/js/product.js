import { getParam } from "/js/utils.mjs";
import ProductData from "/js/ProductData.mjs";
import ProductDetails from "/js/ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();