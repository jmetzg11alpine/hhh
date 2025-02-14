import { getClaimedItems } from "/frontend/api/customer.js";
import { setupShadowComponent, convertDateTime } from "/frontend/api/config.js";

class CustomerItemsClaimed extends HTMLElement {
  constructor() {
    super();
    this.container = setupShadowComponent(this, "customer/list-items.css");
  }

  async connectedCallback() {
    const data = await getClaimedItems();
    this.render(data);
  }

  render(data) {
    if (!data || data.length === 0) {
      this.container.innerHTML = `<p>No items available.</p>`;
      return;
    }
    const template = document.getElementById("customer-items-claimed-template");
    this.container.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.classList.add("item-container");
    data.forEach((item) => {
      const itemClone = template.content.cloneNode(true);
      itemClone.querySelector(".title").textContent = item.title;
      itemClone.querySelector(".date").textContent = convertDateTime(
        item.dateTime
      );
      itemClone.querySelector(".description").textContent = item.description;
      itemClone.querySelector(
        ".customer"
      ).innerHTML = `<strong>${item.customer}</strong>`;
      itemClone.querySelector(
        ".quantity"
      ).innerHTML = `<strong>Quantity: </strong>${item.quantity}`;
      wrapper.appendChild(itemClone);
    });
    this.container.appendChild(wrapper);
  }
}

customElements.define("customer-items-claimed", CustomerItemsClaimed);
