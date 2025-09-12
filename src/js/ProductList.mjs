import { renderListWithTemplate } from './utils.mjs';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    const filteredList = this.filterProducts(list);
    this.renderList(filteredList);
  }

  filterProducts(products) {
    // Filter products that have corresponding detail pages
    // Based on the product_pages directory listing:
    // marmot-ajax-3.html (Id: 880RR)
    // northface-talus-4.html (Id: 985RF)
    // northface-alpine-3.html (Id: 985PR)
    // cedar-ridge-rimrock-2.html (Id: 344YJ)
    const productIdsWithDetailPages = ['880RR', '985RF', '985PR', '344YJ'];
    return products.filter(product => productIdsWithDetailPages.includes(product.Id));
  }

  renderList(list) {
    renderListWithTemplate(this.buildProductCardTemplate, this.listElement, list, 'beforeend', true);
  }

  buildProductCardTemplate(product) {
    return `<li class="product-card">
      <a href="../product_pages/index.html?productid=${product.Id}">
        <img
          src="${product.Image.replace('../images/', 'images/')}"
          alt="Image of ${product.Name}"
        />
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>`;
  }
}
