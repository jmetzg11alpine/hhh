class ItemCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Encapsulated Shadow DOM
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/styles/components/item-card.css">
        <div class="card">
          <h2>${this.getAttribute('title') || 'Default Title'}</h2>
          <p>${this.getAttribute('description') || 'No description available.'}</p>
        </div>
      `;
    }
  }
}

// Register the custom element
customElements.define('item-card', ItemCard);
