import { apiRequest } from '/frontend/api/config.js';

export const saveNewItem = (itemData) => apiRequest('save_item', 'POST', itemData);
export const getItemsAdmin = () => apiRequest('get_items_admin');
export const editItem = (item) => apiRequest('edit_item', 'POST', item);
export const removeItem = (item) => apiRequest('remove_item', 'POST', item);
export const claimItem = (item) => apiRequest('admin_claim_item', 'POST', item);
