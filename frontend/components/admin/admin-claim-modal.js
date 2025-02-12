import { setupShadowComponent } from '/frontend/api/config.js';

class ClaimModal extends HTMLElement {
  constructor() {
    super();
    this.container = setupShadowComponent(this, 'admin/admin-claim-modal');
  }

  connectedCallback() {
    if (this.container) {
      this.container.innerHTML = `
            <div class="overlay"></div>
            <div class="modal">
                <h2>Claim Item</h2>
                <button class="close-modal">Cancel</button>
            </div>
        `;
    }
    this.container
      .querySelector('.close-modal')
      .addEventListener('click', () => this.hide());
  }

  show() {
    console.log('show was called');
    this.container.querySelector('.modal').classList.add('show');
    this.container.querySelector('.overlay').classList.add('show');
  }

  hide() {
    this.container.querySelector('.modal').classList.remove('show');
    this.container.querySelector('.overlay').classList.remove('show');
  }
}

customElements.define('adim-claim-modal', ClaimModal);
