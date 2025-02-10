import { getItems } from '/frontend/api/customer.js';
import { setupShadowComponent } from '/frontend/api/config.js';

class ListItems extends HTMLElement {
  constructor() {
    super();
    this.container = setupShadowComponent(this, 'customer/list-items.css');
  }

  async connectedCallback() {
    const data = await getItems();
    this.render(data);
  }

  render(data) {
    if (!data || data.length === 0) {
      this.container.innerHTML = `<p>No items available.</p>`;
      return;
    }

    this.container.innerHTML = `
        <div class="item-container">
            ${data
              .map(
                (item) => `
                <div class="item">
                    <div class="row">
                      <h3>${item.title}</h3>
                       <p>${new Date(item.date).toDateString()}</p>
                    </div>
                    <p>${item.description}</p>
                    <div class="row">
                      <p><strong>Remaing:</strong> ${item.remainingQ}</p>
                      <button>Claim</button>
                    </div>
                </div>
            `
              )
              .join('')}
        </div>
    `;
  }
}

customElements.define('list-items', ListItems);
