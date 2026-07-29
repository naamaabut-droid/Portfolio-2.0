(function () {
  var overlay = document.createElement('div');
  overlay.className = 'site-lightbox';
  overlay.innerHTML = '<button class="site-lightbox__close" aria-label="Close">&times;</button><img class="site-lightbox__img" alt="" />';
  document.body.appendChild(overlay);
  var overlayImg = overlay.querySelector('.site-lightbox__img');

  function open(src, alt) {
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    overlay.classList.add('is-open');
    document.body.classList.add('lightbox-open');
  }

  function close() {
    overlay.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    overlayImg.src = '';
  }

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target.classList.contains('site-lightbox__close')) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  document.querySelectorAll('.proj-media-panel').forEach(function (panel) {
    var sub = panel.querySelector('.sub');
    if (!sub || sub.textContent.toLowerCase().indexOf('enlarge') === -1) return;
    panel.querySelectorAll('img').forEach(function (img) {
      img.classList.add('is-zoomable');
      img.addEventListener('click', function () {
        open(img.currentSrc || img.src, img.alt);
      });
    });
  });
})();
