import { saveNewItem } from '/frontend/api/admin.js';
import { setupShadowComponent } from '/frontend/api/config.js';

class NewItem extends HTMLElement {
  constructor() {
    super();
    this.container = setupShadowComponent(this, 'admin/new-item.css');
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.container.innerHTML = `
            <div class="card">
                <form id="new-item-form">
                    <div class="form-row">
                      <div class="form-group title">
                        <label for="title">Title:</label>
                        <input type="text" id="title" required>
                      </div>
                      <div class="form-group"></div>
                      <div class="form-group date">
                        <label for="date">Date:</label>
                        <input type="date" id="date" required>
                      </div>
                      <div class="form-group quantity">
                         <label for="quantity">Quantity:</label>
                        <input type="number" id="quantity" required>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="description">Description:</label>
                      <textarea id="description" required></textarea>
                    </div>
                    <div class="form-row button-row">
                      <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        `;

      this.popup = document.querySelector('pop-up');
      const form = this.container.querySelector('#new-item-form');
      form.addEventListener('submit', (event) => this.handleSave(event));
    }
  }
  handleSave(event) {
    event.preventDefault();
    const titleInput = this.container.querySelector('#title');
    const descriptionInput = this.container.querySelector('#description');
    const dateInput = this.container.querySelector('#date');
    const quantityInput = this.container.querySelector('#quantity');
    const newItem = {
      title: titleInput.value,
      description: descriptionInput.value,
      date: dateInput.value,
      quantity: parseInt(quantityInput.value, 10),
    };

    saveNewItem(newItem)
      .then(() => {
        this.popup.showMessage('Item Saved!');
        titleInput.value = '';
        descriptionInput.value = '';
        dateInput.value = '';
        quantityInput.value = '';

        this.dispatchEvent(new CustomEvent('item-added', { bubbles: true }));
      })
      .catch((error) => {
        console.error('Error saving item:', error);
      });
  }
}

customElements.define('new-item', NewItem);
