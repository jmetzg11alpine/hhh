import { url } from '/frontend/api/config.js';

export async function getItems() {
  try {
    const response = await fetch(`${url}/get_items`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error getting items for customer: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('error fetching itmes for customers');
    return [];
  }
}

export async function getClaimedItems() {
  try {
    const response = await fetch(`${url}/get_claimed_items`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error getting claimed items for customer: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('error fetching itmes for customers');
    return [];
  }
}
