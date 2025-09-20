import { renderListWithTemplate } from './utils.mjs';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    this.updateBreadcrumb(list.length);
  }

  renderList(list) {
    renderListWithTemplate(this.buildProductCardTemplate, this.listElement, list, 'beforeend', true);
  }

  buildProductCardTemplate(product) {
    return `<li class="product-card">
      <a href="../product_pages/index.html?productid=${product.Id}">
                <img
                  src="${product.Images?.PrimaryMedium}"
                  alt="Image of ${product.Name}"        />
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>`;
  }

  updateBreadcrumb(count) {
    const breadcrumbElement = document.querySelector('.breadcrumb');
    if (breadcrumbElement) {
      const categoryName =
        this.category.charAt(0).toUpperCase() + this.category.slice(1);
      breadcrumbElement.textContent = `${categoryName} → (${count} items)`;
    }
  }
}
