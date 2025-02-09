import { getItemsAdmin, editItem } from '/frontend/api/admin.js';

class AdminList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const data = await getItemsAdmin();
    this.render(data);
  }

  render(data) {
    if (!data || data.length === 0) {
      this.shadowRoot.innerHTML = `<p>No items available.</p>`;
      return;
    }

    this.shadowRoot.innerHTML = `
            <style>
                @import url('/frontend/styles/components/list-items.css');
            </style>
            <div class="item-container">
                ${data
                  .map(
                    (item) => `
                            <div class="item">
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>
                                <p>Quantity: ${item.quantity}</p>
                                <p><strong>Date:</strong> ${new Date(
                                  item.date
                                ).toDateString()}</p>
                                <button>Update</button>
                            </div>
                        `
                  )
                  .join('')}
            </div>
        `;
  }
}

customElements.define('admin-list', AdminList);
