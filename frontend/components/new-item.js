import { saveNewItem } from '/frontend/api/admin.js';

class NewItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/styles/components/new-item.css">
            <div class="card">
                <h2>Add New Item</h2>
                <form id="new-item-form">
                    <label for="title">Title:</label>
                    <input type="text
                </form>
                <div>Some cool text</div>
                <button id="save-button">Save</button>
            </div>
        `;

      const button = this.shadowRoot.getElementById('save-button');
      if (button) {
        button.addEventListener('click', () => this.handleSave());
      }
    }
  }
  handleSave() {
    saveNewItem();
  }
}

customElements.define('new-item', NewItem);
