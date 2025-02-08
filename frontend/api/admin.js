import { url } from '/frontend/api/config.js';

export async function saveNewItem() {
  console.log(`Sending request to: ${url}/item`);
  try {
    const response = await fetch(`${url}/item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'hello' }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('New item saved:', data);
    return data;
  } catch (error) {
    console.error('error fetching items: ', error);
  }
}
