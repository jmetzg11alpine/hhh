import { saveNewItem } from "/frontend/api/admin.js";
import { setupShadowComponent } from "/frontend/api/config.js";

class AdminNewItem extends HTMLElement {
  constructor() {
    super();
    this.container = setupShadowComponent(this, "admin/new-item.css");
  }

  async connectedCallback() {
    if (this.container) {
      const template = document.getElementById("admin-new-item-template");
      const templateContent = template.content.cloneNode(true);
      this.container.innerHTML = "";
      this.container.appendChild(templateContent);
      this.popup = document.querySelector("pop-up");
      const form = this.container.querySelector("#new-item-form");
      form.addEventListener("submit", (event) => this.handleSave(event));
    }
  }

  handleSave(event) {
    event.preventDefault();
    const titleInput = this.container.querySelector("#title");
    const descriptionInput = this.container.querySelector("#description");
    const dateInput = this.container.querySelector("#date");
    const quantityInput = this.container.querySelector("#quantity");
    const newItem = {
      title: titleInput.value,
      description: descriptionInput.value,
      date: dateInput.value,
      quantity: parseInt(quantityInput.value, 10),
    };

    saveNewItem(newItem)
      .then(() => {
        this.popup.showMessage("Item Saved!");
        titleInput.value = "";
        descriptionInput.value = "";
        dateInput.value = "";
        quantityInput.value = "";

        this.dispatchEvent(new CustomEvent("item-added", { bubbles: true }));
      })
      .catch((error) => {
        console.error("Error saving item:", error);
      });
  }
}

customElements.define("admin-new-item", AdminNewItem);
