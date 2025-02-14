import {
  getItemsAdmin,
  editItem,
  removeItem,
  claimItem,
} from "/frontend/api/admin.js";
import {
  setupShadowComponent,
  formatDateForInput,
} from "/frontend/api/config.js";

class AdminListItems extends HTMLElement {
  constructor() {
    super();
    this.container = setupShadowComponent(this, "admin/admin-list.css");
  }

  async connectedCallback() {
    this.modal = document.querySelector("admin-claim-modal");
    this.popup = document.querySelector("pop-up");
    this.loadData();
    document.addEventListener("item-added", () => this.loadData());
  }

  async loadData() {
    const data = await getItemsAdmin();
    this.render(data);
  }

  render(data) {
    if (!data || data.length === 0) {
      this.container.innerHTML = `<p>No items available.</p>`;
      return;
    }
    const template = document.getElementById("admin-list-items-template");
    this.container.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.classList.add("item-container");
    data.forEach((item) => {
      const itemClone = template.content.cloneNode(true);
      const itemElement = itemClone.querySelector(".item");
      itemElement.setAttribute("data-id", item.id);
      itemClone.querySelector(".input-title").value = item.title;
      itemClone.querySelector(".input-description").value = item.description;
      itemClone.querySelector(".input-quantityR").value = parseInt(
        item.remainingQ
      );
      itemClone.querySelector(".input-quantityO").value = parseInt(
        item.originalQ
      );
      itemClone.querySelector(".input-date").value = formatDateForInput(
        item.date
      );
      wrapper.appendChild(itemClone);
    });
    this.container.appendChild(wrapper);

    this.container.querySelectorAll(".update-btn").forEach((button) => {
      button.addEventListener("click", (event) => this.handleUpdate(event));
    });
    this.container.querySelectorAll(".remove-btn").forEach((button) => {
      button.addEventListener("click", (event) => this.handleRemove(event));
    });
    this.container.querySelectorAll(".claim-btn").forEach((button) => {
      button.addEventListener("click", (event) => this.handleClaim(event));
    });
  }

  handleUpdate(event) {
    const itemElement = event.target.closest(".item");
    const itemId = itemElement.getAttribute("data-id");
    const updatedTitle = itemElement.querySelector(".input-title").value;
    const updatedDescription =
      itemElement.querySelector(".input-description").value;
    const updatedRemainingQ =
      itemElement.querySelector(".input-quantityR").value;
    const updatedOriginalQ =
      itemElement.querySelector(".input-quantityO").value;
    const updatedDate = itemElement.querySelector(".input-date").value;

    const updatedItem = {
      id: parseInt(itemId),
      title: updatedTitle,
      description: updatedDescription,
      remainingQ: parseInt(updatedRemainingQ),
      originalQ: parseInt(updatedOriginalQ),
      date: updatedDate,
    };
    editItem(updatedItem).then(() => {
      this.popup.showMessage("Item Edited!");
      this.loadData();
    });
  }

  handleRemove(event) {
    const itemElement = event.target.closest(".item");
    const itemId = itemElement.getAttribute("data-id");

    removeItem({ id: parseInt(itemId) }).then(() => {
      this.popup.showMessage("Item Removed");
      this.loadData();
    });
  }

  handleClaim(event) {
    const itemElement = event.target.closest(".item");
    const itemId = itemElement.getAttribute("data-id");
    const remainingQ = itemElement.querySelector(".input-quantityR").value;
    this.modal.show(itemId, remainingQ);
  }
}

customElements.define("admin-list-items", AdminListItems);
