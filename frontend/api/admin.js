import { url } from '/frontend/api/config.js';

export async function saveNewItem(itemData) {
  try {
    const response = await fetch(`${url}/item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('error fetching items: ', error);
  }
}
