import { apiRequest } from '/frontend/api/config.js';

export const saveNewItem = (itemData) => apiRequest('save_item', 'POST', itemData);
export const getItemsAdmin = () => apiRequest('get_items_admin');

export async function editItem(itemDetails) {
  console.log(itemDetails);
}
