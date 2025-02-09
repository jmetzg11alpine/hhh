export const url = 'http://localhost:8080';

export function setupShadowComponent(component, cssPath) {
  if (!component.shadowRoot) {
    component.attachShadow({ mode: 'open' });
  }

  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', '/frontend/styles/components/' + cssPath);

  const container = document.createElement('div');

  component.shadowRoot.append(link, container);

  return container;
}

export function convertDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
}
