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
    if (!response.ok) {
      throw new Error(`HTTP error getting items for admin: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('error fetching items for customers', error);
    return [];
  }
}

export async function editItem(itemDetails) {
  console.log(itemDetails);
}
