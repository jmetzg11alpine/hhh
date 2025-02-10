import { apiRequest } from '/frontend/api/config.js';

export const getItems = () => apiRequest('get_items');
export const getClaimedItems = () => apiRequest('get_claimed_items');
