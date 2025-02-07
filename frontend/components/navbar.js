class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/frontend/styles/components/navbar.css">
        <nav>
          <a href="/">Home</a>
          <a href="/info">Info</a>
        </nav>
      `;
    }
  }
}

customElements.define('navbar-component', Navbar);
