import { setupShadowComponent } from '/frontend/api/config.js';

class SectionTitle extends HTMLElement {
  static get observedAttributes() {
    return ['title'];
  }

  constructor() {
    super();
    this.container = setupShadowComponent(this, 'global/section-title.css');
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.container.innerHTML = `
        <div class="section-title">
          <h2>${this.getAttribute('title')}</h2>
        </div>
        `;
  }
}

customElements.define('section-title', SectionTitle);
