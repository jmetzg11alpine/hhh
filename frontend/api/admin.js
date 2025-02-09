import { url } from '/frontend/api/config.js';

export async function saveNewItem(itemData) {
  try {
    const response = await fetch(`${url}/save_item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });
    console.log(itemData);
    if (!response.ok) {
      throw new Error(`HTTP error saving new item! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('error saving new item: ', error);
  }
}

export async function getItemsAdmin() {
  try {
    const response = await fetch(`${url}/get_items_admin`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error getting items for admin: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('error fetching items for customers', error);
    return [];
  }
}
