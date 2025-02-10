export const url = 'http://localhost:8080';

export async function apiRequest(endpoint, method = 'GET', body = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${url}/${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error ${method} ${endpoint}: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in ${method} ${endpoint}:`, error);
    return [];
  }
}

export function setupShadowComponent(component, cssPath) {
  if (!component.shadowRoot) {
    component.attachShadow({ mode: 'open' });
  }

  const link1 = document.createElement('link');
  link1.setAttribute('rel', 'stylesheet');
  link1.setAttribute('href', '/frontend/styles/components/' + cssPath);

  const link2 = document.createElement('link');
  link2.setAttribute('rel', 'stylesheet');
  link2.setAttribute('href', '/frontend/styles/global.css');

  const container = document.createElement('div');

  component.shadowRoot.append(link1, link2, container);
  return container;
}

export function convertDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
}

export function formateDateForInput(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}
