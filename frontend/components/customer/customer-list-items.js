import { getItems } from "/frontend/api/customer.js";
import { setupShadowComponent } from "/frontend/api/config.js";

class CustomerListItems extends HTMLElement {
  constructor() {
    super();
    this.container = setupShadowComponent(this, "customer/list-items.css");
  }

  async connectedCallback() {
    const data = await getItems();
    this.render(data);
  }

  render(data) {
    if (!data || data.length === 0) {
      this.container.innerHTML = `<p>No items available.</p>`;
      return;
    }
    const template = document.getElementById("customer-items-list-template");
    this.container.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.classList.add("item-container");
    data.forEach((item) => {
      const itemClone = template.content.cloneNode(true);
      itemClone.querySelector(".title").textContent = item.title;
      itemClone.querySelector(".date").textContent = new Date(
        item.date
      ).toDateString();
      itemClone.querySelector(".description").textConten = item.description;
      itemClone.querySelector(
        ".remaining"
      ).innerHTML = `<strong>Remaining: </strong> ${item.remainingQ}`;
      wrapper.appendChild(itemClone);
    });
    this.container.appendChild(wrapper);
  }
}

customElements.define("customer-list-items", CustomerListItems);
