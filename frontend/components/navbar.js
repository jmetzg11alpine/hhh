class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', '/frontend/styles/components/navbar.css');
    this.container = document.createElement('div');

    this.shadowRoot.appendChild(link);
    this.shadowRoot.append(link, this.container);
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.container.innerHTML = `

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
