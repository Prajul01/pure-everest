// js/loadHeader.js
function loadHeader() {
  fetch('header.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('header-container').innerHTML = html;

      // Delay active link detection after DOM inserted
      setTimeout(() => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
          if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
          }
        });
      }, 50);
    });
}

document.addEventListener('DOMContentLoaded', loadHeader);
