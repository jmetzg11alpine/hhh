const routes = {
  '/': '/frontend/pages/home.html',
  '/info': '/frontend/pages/info.html',
  '/admin': '/frontend/pages/admin.html',
};

function navigateTo(url) {
  history.pushState({}, '', url);
  loadPage(url);
}

async function loadPage(url) {
  const page = routes[url] || routes['/'];
  const content = document.getElementById('app-content');

  if (!content) return;

  if (content.dataset.currentPage === url) return;
  content.dataset.currentPage = url;

  const response = await fetch(page);

  content.innerHTML = await response.text();
}

window.onpopstate = () => loadPage(location.pathname);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (target && target.getAttribute('href').startsWith('/')) {
      e.preventDefault();
      navigateTo(target.getAttribute('href'));
    }
  });

  loadPage(location.pathname);
});
