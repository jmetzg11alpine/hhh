import { saveNewItem } from '/frontend/api/admin.js';

class NewItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
            <style>
                @import url('/frontend/styles/components/new-item.css');
            </style>
            <div class="card">
                <h2>Add New Item</h2>
                <form id="new-item-form">
                    <label for="title">Title:</label>
                    <input type="text" id="title" required>

                    <label for="description">Description:</label>
                    <textarea id="description" required></textarea>

                    <label for="date">Date:</label>
                    <input type="date" id="date" required>

                    <label for="customer">Customer:</label>
                    <input type="text" id="customer">

                    <label for="quantity">Quantity:<label>
                    <input type="number" id="quantity" required>

                    <button type="submit">Save</button>
                </form>
            </div>
        `;

      this.popup = document.querySelector('pop-up');
      const form = this.shadowRoot.getElementById('new-item-form');
      form.addEventListener('submit', (event) => this.handleSave(event));
    }
  }
  handleSave(event) {
    event.preventDefault();
    const titleInput = this.shadowRoot.getElementById('title');
    const descriptionInput = this.shadowRoot.getElementById('description');
    const dateInput = this.shadowRoot.getElementById('date');
    const customerInput = this.shadowRoot.getElementById('customer');
    const quantityInput = this.shadowRoot.getElementById('quantity');
    const newItem = {
      title: titleInput.value,
      description: descriptionInput.value,
      date: dateInput.value,
      customer: customerInput.value,
      quantity: parseInt(quantityInput.value, 10),
    };

    saveNewItem(newItem)
      .then(() => {
        this.popup.showMessage('Item Saved!');
        titleInput.value = '';
        descriptionInput.value = '';
        dateInput.value = '';
        customerInput.value = '';
        quantityInput.value = '';
      })
      .catch((error) => {
        console.error('Error saving item:', error);
      });
  }
}

customElements.define('new-item', NewItem);
