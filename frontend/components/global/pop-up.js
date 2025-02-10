class Popup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
        <style>
            @import url('/frontend/styles/components/global/pop-up.css');
        </style>
        <div class="popup" id="popup"></div>
    `;
  }

  showMessage(message) {
    const popup = this.shadowRoot.getElementById('popup');
    popup.textContent = message;
    popup.classList.add('show');

    setTimeout(() => {
      popup.classList.remove('show');
    }, 3000);
  }
}

customElements.define('pop-up', Popup);
