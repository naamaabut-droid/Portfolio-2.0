(function () {
  if (!location.hash) return;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  var target = document.querySelector(location.hash);
  if (!target) return;
  window.scrollTo(0, 0);
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.addEventListener('load', function () {
    requestAnimationFrame(function () {
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });
})();
