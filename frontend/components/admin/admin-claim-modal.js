import { setupShadowComponent } from "/frontend/api/config.js";

class AminClaimModal extends HTMLElement {
  constructor() {
    super();
    this.container = setupShadowComponent(this, "admin/admin-claim-modal.css");
    this._itemId = null;
    this._remainingQ = 0;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const tempalte = document.getElementById("admin-claim-item-template");
    const templateContent = tempalte.content.cloneNode(true);
    this.container.innerHTML = "";
    this.container.appendChild(templateContent);
    this.container.querySelector(".customer").value = "";
    this.container.querySelector(".quantity").value = 0;
    this.container.querySelector(
      ".remaining-quantity"
    ).value = `Remaining: ${this._remainingQ}`;

    this.container
      .querySelector(".close")
      .addEventListener("click", () => this.hide());
    this.container
      .querySelector(".claim")
      .addEventListener("click", () => this.claim());
  }

  show(itemId, remainingQ) {
    this._itemId = itemId;
    this._remainingQ = remainingQ;
    this.render();
    this.container.querySelector(".modal").classList.add("show");
    this.container.querySelector(".overlay").classList.add("show");

    const quantityInput = this.container.querySelector(".quantity");
    quantityInput.setAttribute("max", this._remainingQ);
    quantityInput.value = 1; // Default to 1

    this.container.querySelector(
      ".remaining-quantity"
    ).textContent = `Remaining: ${this._remainingQ}`;
  }

  hide() {
    this.container.querySelector(".modal").classList.remove("show");
    this.container.querySelector(".overlay").classList.remove("show");
  }

  claim() {
    console.log(this._itemId);
    console.log(this._remainingQ);
  }
}

customElements.define("admin-claim-modal", AminClaimModal);
