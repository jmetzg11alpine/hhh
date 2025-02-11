import { getItemsAdmin, editItem, removeItem } from '/frontend/api/admin.js';
import { setupShadowComponent, formatDateForInput } from '/frontend/api/config.js';

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
                              <div class="form-group">
                                <label>Title:</label>
                                <input
                                  type="text"
                                  class="input-title"
                                  id="title-${item.id}"
                                  value="${item.title}"
                                >
                              </div>


                              <div class="form-group">
                                <label>Description:</label>
                                <textarea class="input-description">${
                                  item.description
                                }</textarea>
                              </div>

                              <div class="quantity">
                                <label>Remaining:</label>
                                <input
                                  type="number"
                                  class="input-quantityR"
                                  value="${parseInt(item.remainingQ)}"
                                >
                                <label>Original:</label>
                                <input
                                  type="number"
                                  class="input-quantityO"
                                  value="${parseInt(item.originalQ)}"
                                >
                              </div>

                              <div class="date">
                                <label>Date:</label>
                                <input
                                  type="date"
                                  class="input-date"
                                  value="${formatDateForInput(item.date)}"
                                >
                              </div>



                              <div class="button-row">
                                <button class="update-btn">Update</button>
                                <button class="claim-btn">Make Claim</button>
                                <button class="remove-btn">Remove</button>
                              </div>
                            </div>
                        `
                  )
                  .join('')}
            </div>
        `;
    this.container.querySelectorAll('.update-btn').forEach((button) => {
      button.addEventListener('click', (event) => this.handleUpdate(event));
    });
    this.container.querySelectorAll('.remove-btn').forEach((button) => {
      button.addEventListener('click', (event) => this.handleRemove(event));
    });
    this.popup = document.querySelector('pop-up');
  }

  handleUpdate(event) {
    const itemElement = event.target.closest('.item');
    const itemId = itemElement.getAttribute('data-id');
    const updatedTitle = itemElement.querySelector('.input-title').value;
    const updatedDescription = itemElement.querySelector('.input-description').value;
    const updatedRemainingQ = itemElement.querySelector('.input-quantityR').value;
    const updatedOriginalQ = itemElement.querySelector('.input-quantityO').value;
    const updatedDate = itemElement.querySelector('.input-date').value;

    const updatedItem = {
      id: parseInt(itemId),
      title: updatedTitle,
      description: updatedDescription,
      remainingQ: parseInt(updatedRemainingQ),
      originalQ: parseInt(updatedOriginalQ),
      date: updatedDate,
    };
    editItem(updatedItem).then(() => {
      this.popup.showMessage('Item Edited!');
    });
  }

  handleRemove(event) {
    const itemElement = event.target.closest('.item');
    const itemId = itemElement.getAttribute('data-id');

    const updatedData = removeItem({ id: parseInt(itemId) }).then(() => {
      this.popup.showMessage('Item Removed');
      this.loadData();
    });
  }
}

customElements.define('admin-list', AdminList);
