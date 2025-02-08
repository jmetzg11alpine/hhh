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

                    <button type="submit">Save</button>
                </form>
                <p id="message">Item Saved!</p>
            </div>
        `;

      const form = this.shadowRoot.getElementById('new-item-form');
      form.addEventListener('submit', (event) => this.handleSave(event));
    }
  }
  handleSave(event) {
    event.preventDefault();
    const title = this.shadowRoot.getElementById('title').value;
    const description = this.shadowRoot.getElementById('description').value;
    const date = this.shadowRoot.getElementById('date').value;
    const newItem = { title, description, date };

    saveNewItem(newItem)
      .then(() => {
        this.shadowRoot.getElementById('message').style.display = 'block';
      })
      .catch((error) => {
        console.error('Error saving item:', error);
      });
  }
}

customElements.define('new-item', NewItem);
