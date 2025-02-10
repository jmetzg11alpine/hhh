import { getItemsAdmin, editItem } from '/frontend/api/admin.js';
import { setupShadowComponent, formateDateForInput } from '/frontend/api/config.js';

class AdminList extends HTMLElement {
  constructor() {
    super();
    this.container = setupShadowComponent(this, 'admin/admin-list.css');
  }

  async connectedCallback() {
    this.loadData();
    document.addEventListener('item-added', () => this.loadData());
  }

  async loadData() {
    const data = await getItemsAdmin();
    console.log(data);
    this.render(data);
  }

  render(data) {
    if (!data || data.length === 0) {
      this.container.innerHTML = `<p>No items available.</p>`;
      return;
    }

    this.container.innerHTML = `
            <div class="item-container">
                ${data
                  .map(
                    (item) => `
                            <div class="item" data-id="${item.id}">
                              <label>Title:</label>
                              <input
                                type="text"
                                class="title"
                                id="title-${item.id}"
                                value="${item.title}"
                              >

                              <label>Description:</label>
                              <textarea class="description">${item.description}</textarea>

                              <div class="quantity-and-date">
                                <label>Quantity:</label>
                                <p>${item.remainingQ} /
                                  <input
                                    type="number"
                                    class="quantity"
                                    value="${parseInt(item.originalQ)}"
                                  >
                                </p>

                                <label>Date:</label>
                                <input
                                  type="date"
                                  class="date"
                                  value="${formateDateForInput(item.date)}"
                                >
                              </div>

                              <button class="update-btn">Update</button>
                            </div>
                        `
                  )
                  .join('')}
            </div>
        `;
    this.container.querySelectorAll('.update-btn').forEach((button) => {
      button.addEventListener('click', (event) => this.handleUpdate(event));
    });
  }

  async handleUpdate(event) {
    const itemElement = event.target.closest('.item');
    const itemId = itemElement.getAttribute('data-id');

    const updatedTitle = itemElement.querySelector('.title').value;
    const updatedDescription = itemElement.querySelector('.description').value;
    const updatedOriginalQ = parseInt(itemElement.querySelector('.quantity').value);
    const updatedDate = itemElement.querySelector('.date').value;

    const updatedItem = {
      id: itemId,
      title: updatedTitle,
      description: updatedDescription,
      originalQ: updatedOriginalQ,
      date: updatedDate,
    };

    editItem(updatedItem);
  }
}

customElements.define('admin-list', AdminList);
