class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          @import url('/frontend/styles/components/navbar.css');
        </style>
        <nav>
          <a href="/">Home</a>
          <a href="/info">Info</a>
          <a href="/contact">Contact</a>
        </nav>
      `;
    }
  }
}

customElements.define('navbar-component', Navbar);
