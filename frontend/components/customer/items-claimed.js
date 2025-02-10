import { getClaimedItems } from '/frontend/api/customer.js';
import { setupShadowComponent, convertDateTime } from '/frontend/api/config.js';

class ItemsClaimed extends HTMLElement {
  constructor() {
    super();
    this.container = setupShadowComponent(this, 'customer/list-items.css');
  }

  async connectedCallback() {
    const data = await getClaimedItems();
    this.render(data);
  }

  render(data) {
    this.container.innerHTML = `
    <div class="item-container">
        ${data
          .map(
            (item) => `
                    <div class="item">
                        <div class="row">
                            <h3>${item.title}</h3>
                            <p>${convertDateTime(item.dateTime)}</p>
                        </div>
                        <p>${item.description}</p>
                        <div class="row">
                            <p><strong>${item.customer}</strong></p>
                            <p><strong>Quantity: </strong>${item.quantity}</p>
                        </div>
                    </div>
                `
          )
          .join('')}
    </div>
  `;
  }
}

customElements.define('items-claimed', ItemsClaimed);
